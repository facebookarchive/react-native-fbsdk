// Copyright 2004-present Facebook. All Rights Reserved.
/*
 A node script to help set up FBSDK frameworks for use with https://github.com/facebook/react-native-fbsdk
 after you have already run `rnpm install react-native-fbsdk`.

 Note that you need to create a Facebook App in https://developers.facebook.com/
 and get the Facebook APP ID and Facebook APP Name in order to set up the Info.plist.

 Usage:
 1. Copy the script into your react native project root
 2. npm install the packages: plist, xcode, adm-zip.
 3. do 'node ios_setup.js <AppID> <AppName>'.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const plist = require('plist');
const spawn = require('child_process').spawn;
const xcode = require('xcode');
const AdmZip = require('adm-zip');

const frameworkDir = 'ios/Frameworks/';
const frameworkUrl = 'https://origincache.facebook.com/developers/resources/?id=facebook-ios-sdk-current.zip';

// Get Facebook App ID and App Name.
if (process.argv.length <= 3) {
    console.log('Usage: ' + __filename + ' <APPID> <APPNAME>');
    process.exit(-1);
}
const appId = process.argv[2];
const appName = process.argv[3];

// Download the FBSDK frameworks into a directory ./ios/Frameworks
try {
  fs.accessSync(frameworkDir, fs.F_OK);
} catch (e) {
  fs.mkdirSync(frameworkDir);
}
const zipFilePath = path.join(frameworkDir, 'fbsdk.zip');
const out = fs.createWriteStream(zipFilePath);
const curl = spawn('curl', ['-#k', frameworkUrl]);
curl.stdout.on('data', function(data) {
  out.write(data);
});
curl.stdout.on('end', function(data) {
  out.end();
});
curl.on('exit', function(exitCode) {
  if (exitCode !== 0) {
    console.log('Download failed.');
  } else {
    const zip = new AdmZip(zipFilePath);
    zip.extractAllTo(frameworkDir, true);
    fs.unlink(zipFilePath);
    console.log('Finished downloading the FBSDK frameworks');
  }
});

// Correct the FRAMEWORK_SEARCH_PATHS for RCTFBSDK
const rctfbsdkProjectPath = './node_modules/react-native-fbsdk/ios/RCTFBSDK.xcodeproj/project.pbxproj';
const rctfbsdkProject = xcode.project(rctfbsdkProjectPath);
rctfbsdkProject.parse(function (err) {
  if (err) {
    console.log(err);
    return;
  }
  rctfbsdkProject.updateBuildProperty('FRAMEWORK_SEARCH_PATHS','"$(PROJECT_DIR)/../../../ios/Frameworks"');
  fs.writeFileSync(rctfbsdkProjectPath, rctfbsdkProject.writeSync());
  console.log('Updated RCTFBSDK FRAMEWORK_SEARCH_PATHS');
});

// Link the FBSDK*Kit.frameworks.
const files = fs.readdirSync('./ios/');
var myProjName = files.filter(function (f) { return f.substr(-10) === '.xcodeproj'; })[0];
const myProjPath = './ios/' + myProjName + '/project.pbxproj';
myProjName = myProjName.replace('.xcodeproj', '');
console.log('Updating target:' + myProjName + ' at ' + myProjPath + ' ...');

const myProj = xcode.project(myProjPath);
myProj.parse(function (err) {
  if (err) {
      console.log(err);
      return;
  }
  // Need to create a Frameworks group: https://github.com/alunny/node-xcode/issues/43
  myProj.pbxCreateGroup('Frameworks', './ios/Frameworks');

  // NOTE: Assumes first target is the app.
  const target = myProj.getFirstTarget().uuid;
  myProj.addFramework('./ios/Frameworks/FBSDKCoreKit.framework', { 'customFramework' : true, 'target' : target, 'link' : true });
  myProj.addFramework('./ios/Frameworks/FBSDKShareKit.framework', { 'customFramework' : true, 'target' : target, 'link' : true });
  myProj.addFramework('./ios/Frameworks/FBSDKLoginKit.framework', { 'customFramework' : true, 'target' : target, 'link' : true });

  // WARNING: this will overwrite any existing search paths
  myProj.updateBuildProperty('FRAMEWORK_SEARCH_PATHS','"$(PROJECT_DIR)/Frameworks/"');
  fs.writeFileSync(myProjPath, myProj.writeSync());
  console.log('Finished updating ' + myProjPath);
});

// Update Info.plist
var plistDirPath = '';
files.map(function(file) {
  return path.join('./ios/', file);
}).filter(function(file) {
  return fs.statSync(file).isDirectory();
}).forEach(function(file) {
  if (fs.readdirSync(file).indexOf('Base.lproj') !== -1) {
    plistDirPath = file;
  }
});
const plistFilePath = plistDirPath + '/Info.plist';
const plistFile = fs.readFileSync(plistFilePath, 'utf8');
const plistObject = plist.parse(plistFile);
plistObject.CFBundleURLTypes = [{CFBundleURLSchemes: ['fb' + appId]}];
plistObject.FacebookAppID = appId;
plistObject.FacebookDisplayName = appName;
plistObject.LSApplicationQueriesSchemes = ['fbapi', 'fb-messenger-api', 'fbauth2', 'fbshareextension'];
plistObject.NSLocationWhenInUseUsageDescription = '';
fs.writeFileSync(plistFilePath, plist.build(plistObject));
console.log('Finished updating ' + plistFilePath);
