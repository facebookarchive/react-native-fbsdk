/*
 Copyright 2004-present Facebook. All Rights Reserved.

 A node script to help set up FBSDK frameworks for use with https://github.com/facebook/react-native-fbsdk
 after you have already run `rnpm install react-native-fbsdk`.

 Note that you need to create a Facebook App in https://developers.facebook.com/
 and get the Facebook APP ID and Facebook APP Name in order to set up the Info.plist.
 Usage:

 1. add to the 'script' section in package.json of your react-native project the following:
    '"ios:setup": "node ./node_modules/react-native-fbsdk/bin/ios_setup.js"'.
 2. do 'npm run ios:setup <AppID> <AppName>'.
 */

'use strict';

/* eslint-disable no-console */

const AdmZip = require('adm-zip');
const ProgressBar = require('progress');

const fall = require('fastfall');
const fs = require('fs');
const got = require('got');
const path = require('path');
const plist = require('plist');
const pump = require('pump');
const xcode = require('xcode');

const progressBarPattern = '  downloading [:bar] :rate/bps :percent :etas';
const frameworkDir = 'ios/Frameworks/';
const zipFileName = 'fbsdk.zip';
const zipFilePath = path.join(frameworkDir, zipFileName);
const frameworkUrl = 'https://origincache.facebook.com/developers/resources/?id=facebook-ios-sdk-current.zip';

// Get Facebook App ID and App Name.
if (process.argv.length <= 3) {
  console.log('Usage: ios_setup.js <APPID> <APPNAME>');
  process.exit(-1);
}

const appId = process.argv[2];
const appName = process.argv[3];

function downloadFbSdk (next) {
  try {
    fs.accessSync(frameworkDir, fs.F_OK);
  } catch (e) {
    fs.mkdirSync(frameworkDir);
  }

  var bar = null;
  var download = got.stream(frameworkUrl)
    .on('data', chunk => {
      bar.tick(chunk.length);
    })
    .on('response', res => {
      const len = parseInt(res.headers['content-length'], 10);
      bar = new ProgressBar(progressBarPattern, {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: len,
      });
    });

  var writeToFile = fs.createWriteStream(zipFilePath);
  pump(download, writeToFile, next);
}

function unzipFramework (next) {
  console.log('Unzipping the framework');
  const zip = new AdmZip(zipFilePath);
  zip.extractAllTo(frameworkDir, true);
  fs.unlinkSync(zipFilePath);
  console.log('Framework Unzipped!');
  next();
}

function correctSearchPaths (next) {
  const rctfbsdkProjectPath = './node_modules/react-native-fbsdk/ios/RCTFBSDK.xcodeproj/project.pbxproj';
  const rctfbsdkProject = xcode.project(rctfbsdkProjectPath);
  rctfbsdkProject.parse(function (err) {
    if (err) {
      return next(err);
    }
    rctfbsdkProject.updateBuildProperty('FRAMEWORK_SEARCH_PATHS', '"$(PROJECT_DIR)/../../../ios/Frameworks"');
    fs.writeFileSync(rctfbsdkProjectPath, rctfbsdkProject.writeSync());
    console.log('Updated RCTFBSDK FRAMEWORK_SEARCH_PATHS');
    next();
  });
}

function updateFBSDKFrameworks (next) {
  const files = fs.readdirSync('./ios/');
  var myProjName = files.filter((f) => { return f.substr(-10) === '.xcodeproj'; })[0];
  const myProjPath = path.join('./ios/', myProjName, '/project.pbxproj');
  myProjName = myProjName.replace('.xcodeproj', '');
  console.log('Updating target:' + myProjName + ' at ' + myProjPath + ' ...');

  const myProj = xcode.project(myProjPath);
  myProj.parse(function (err) {
    if (err) {
      return next(err);
    }
    myProj.pbxCreateGroup('Frameworks', './ios/Frameworks');

    // NOTE: Assumes first target is the app.
    const target = myProj.getFirstTarget().uuid;
    myProj.addFramework('./ios/Frameworks/FBSDKCoreKit.framework', { 'customFramework': true, 'target': target, 'link': true });
    myProj.addFramework('./ios/Frameworks/FBSDKShareKit.framework', { 'customFramework': true, 'target': target, 'link': true });
    myProj.addFramework('./ios/Frameworks/FBSDKLoginKit.framework', { 'customFramework': true, 'target': target, 'link': true });

    // WARNING: this will overwrite any existing search paths
    myProj.updateBuildProperty('FRAMEWORK_SEARCH_PATHS', '"$(PROJECT_DIR)/Frameworks/"');
    fs.writeFileSync(myProjPath, myProj.writeSync());
    console.log('Finished updating ' + myProjPath);

    next(null, files);
  });
}

function updatePlist (files, next) {
  console.dir(files);
  var plistDirPath = '';
  files.map(function (file) {
    return path.join('./ios/', file);
  }).filter(function (file) {
    return fs.statSync(file).isDirectory();
  }).forEach(function (file) {
    if (fs.readdirSync(file).indexOf('Base.lproj') !== -1) {
      plistDirPath = file;
    }
  });
  const plistFilePath = path.join(plistDirPath, '/Info.plist');
  const plistFile = fs.readFileSync(plistFilePath, 'utf8');
  const plistObject = plist.parse(plistFile);
  plistObject.CFBundleURLTypes = [{CFBundleURLSchemes: ['fb' + appId]}];
  plistObject.FacebookAppID = appId;
  plistObject.FacebookDisplayName = appName;
  plistObject.LSApplicationQueriesSchemes = ['fbapi', 'fb-messenger-api', 'fbauth2', 'fbshareextension'];
  plistObject.NSLocationWhenInUseUsageDescription = '';
  fs.writeFileSync(plistFilePath, plist.build(plistObject));
  console.log('Finished updating ' + plistFilePath);
  next();
}

function done (err) {
  if (err) {
    console.error(err);
  } else {
    console.log('DONE!');
  }
}

fall([downloadFbSdk, unzipFramework, correctSearchPaths, updateFBSDKFrameworks, updatePlist], done);
