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
      alert('Share canceled.');
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
- Download and install the [Facebook SDK for iOS](https://developers.facebook.com/docs/ios).
- Follow the [getting started guide](https://developers.facebook.com/docs/ios/getting-started/) to link your app's project with the Facebook SDK frameworks and set up the app delegate. `FBSDKCoreKit.framework` and `FBSDKShareKit.framework` must be added to your app's Xcode project.
- Add the `react-native-fbsdkcore` package to your app's dependencies in `package.json` and run `npm install`.
- Add `RCTFBSDKShare.xcodeproj` from `node_modules/react-native-fbsdkshare` to your Xcode project navigator.

## License
See the LICENSE file.

## Platform Policy
Developers looking to integrate with the Facebook Platform should familiarize themselves with the [Facebook Platform Policy](https://developers.facebook.com/policy/).
