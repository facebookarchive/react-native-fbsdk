# react-native-fbsdkcore
A wrapper around the functionality from FBSDKCoreKit in the iOS Facebook SDK, supporting graph requests, app events, etc.

## Usage

### Graph Requests
```js
var FBSDKCore = require('react-native-fbsdkcore');
var {
  FBSDKGraphRequest,
} = FBSDKCore;

// ...

// Create a graph request asking for friends with a callback to handle the response.
var fetchFriendsRequest = new FBSDKGraphRequest((error, result) => {
  if (error) {
    alert('Error making request.');
  } else {
    // Data from request is in result
  }
}, '/me/friends');
// Start the graph request.
fetchFriendsRequest.start();

// ...
```

### App events
```js
var FBSDKCore = require('react-native-fbsdkcore');
var {
  FBSDKAppEvents,
} = FBSDKCore;

// ...

// Log a $15 purchase.
FBSDKAppEvents.logPurchase(15, 'USD', null, null)

// ...
```

## Sample App
A sample app is available from the [GitHub repository](https://github.com/facebook/react-native-fbsdk) for React Native FBSDK.

## Installation
- Download and install the [Facebook SDK for iOS](https://developers.facebook.com/docs/ios). The Xcode project assumes that it's installed in the standard location at `~/Documents/FacebookSDK`.
- Follow the [getting started guide](https://developers.facebook.com/docs/ios/getting-started/) to link your project with the Facebook SDK frameworks and set up the app delegate. `FBSDKCoreKit.framework` must be added to your app's Xcode project.
- Add the `react-native-fbsdkcore` package to your app's dependencies in `package.json` and run `npm install`.
- Add `RCTFBSDKCore.xcodeproj` from `node_modules/react-native-fbsdkcore` to your Xcode project navigator.

## License
See the LICENSE file.

## Platform Policy
Developers looking to integrate with the Facebook Platform should familiarize themselves with the [Facebook Platform Policy](https://developers.facebook.com/policy/).
