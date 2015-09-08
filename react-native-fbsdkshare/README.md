# react-native-fbsdkshare
A wrapper around the functionality from FBSDKShareKit in the iOS Facebook SDK, supporting the share button, share dialogs, etc.

## Usage

### Share dialogs
All of the dialogs included are used in a similar way, with differing content types.
```js
var FBSDKShare = require('react-native-fbsdkshare');
var {
  FBSDKShareDialog,
  FBSDKShareLinkContent,
} = FBSDKShare;

// ...

// Build up a shareable link.
var linkContent = new FBSDKShareLinkContent('https://facebook.com', 'Wow, check out this great site!', 'Facebook.com', null);
// Share the link using the native share dialog.
FBSDKShareDialog.show(linkContent, (error, result) => {
  if (!error) {
    if (result.isCancelled) {
      alert('Share cancelled.');
    } else {
      alert('Thanks for sharing!');
    }
  } else {
    alert('Error sharing.');
  }
});

// ..
```

### Share API
Your app must have the publish_actions permission approved to share through the share API.
```js
var FBSDKShare = require('react-native-fbsdkshare');
var {
  FBSDKShareAPI,
  FBSDKSharePhoto,
  FBSDKSharePhotoContent,
} = FBSDKShare;

// ...

// Build up a shareable photo, where 'cat.png' is included in the project. A data URI encoding the image can also be passed.
var photo = new FBSDKSharePhoto('cat.png', true);
var photoContent = new FBSDKSharePhotoContent([photo]);
// Share using the share API.
FBSDKShareAPI.share(photoContent, "/me", "Check out this cat!", (error, result) => {
  if (error) {
    alert('Error sharing');
  } else {
    alert('Shared successfully');
  }
});

// ...
```

## Sample App
A sample app is available from the [GitHub repository](https://github.com/facebook/react-native-fbsdk) for React Native FBSDK.

## Installation

Run `npm install --save react-native-fbsdkshare` to add the package to your app's dependencies.

You'll then also have to add the native iOS code to your app's Xcode project:
- Download and install the [Facebook SDK for iOS](https://developers.facebook.com/docs/ios). The Xcode project assumes that it's installed in the standard location at `~/Documents/FacebookSDK`.
- Follow the [Getting Started guide](https://developers.facebook.com/docs/ios/getting-started/) to link your project with the Facebook SDK frameworks and set up the app delegate. `FBSDKShareKit.framework` must be added to your app's Xcode project.
- Add `RCTFBSDKShare.xcodeproj` from `node_modules/react-native-fbsdkshare` to your app's Xcode project. Follow the [Linking Libraries (iOS) guide](http://facebook.github.io/react-native/docs/linking-libraries-ios.html) to make sure it's added correctly to your project's build targets.

### CocoaPods

Alternatively, [CocoaPods](https://cocoapods.org) can automatically maintain the native iOS code within your Xcode project. To use CocoaPods, create a `PodFile` like this in your app's project directory:

```ruby
source 'https://github.com/CocoaPods/Specs.git'
pod 'React', :subspecs => ['Core', 'RCTImage', 'RCTNetwork', 'RCTText', 'RCTWebSocket'], :path => 'node_modules/react-native'
pod 'react-native-fbsdkshare', :path => 'node_modules/react-native-fbsdkshare'
```

Now run `pod install`. This will automatically download the Facebook SDK for iOS and create an Xcode workspace containing all native files. From now on open `YourApp.xcworkspace` instead of `YourApp.xcodeproject` in Xcode. Because React Native's iOS code is now pulled in via CocoaPods, you also need to remove the `React`, `RCTImage`, etc. subprojects from your app's Xcode project.

Follow the [Getting Started guide](https://developers.facebook.com/docs/ios/getting-started/) to set up a Facebook app, configure your Xcode project, and set up the app delegate. You can skip the steps that talk about downloading and linking the Facebook SDK frameworks -- that's already taken care of by CocoaPods.

## License
See the LICENSE file.

## Platform Policy
Developers looking to integrate with the Facebook Platform should familiarize themselves with the [Facebook Platform Policy](https://developers.facebook.com/policy/).
