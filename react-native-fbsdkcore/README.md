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

Run `npm install --save react-native-fbsdkcore` to add the package to your app's dependencies.

You'll then also have to add the native iOS code to your app's Xcode project:
- Download and install the [Facebook SDK for iOS](https://developers.facebook.com/docs/ios). The Xcode project assumes that it's installed in the standard location at `~/Documents/FacebookSDK`.
- Follow the [Getting Started guide](https://developers.facebook.com/docs/ios/getting-started/) to link your project with the Facebook SDK frameworks and set up the app delegate. `FBSDKCoreKit.framework` must be added to your app's Xcode project.
- Add `RCTFBSDKCore.xcodeproj` from `node_modules/react-native-fbsdkcore` to your app's Xcode project. Follow the [Linking Libraries (iOS) guide](http://facebook.github.io/react-native/docs/linking-libraries-ios.html) to make sure it's added correctly to your project's build targets.


### CocoaPods

Alternatively, [CocoaPods](https://cocoapods.org) can automatically maintain the native iOS code within your Xcode project. To use CocoaPods, create a `PodFile` like this in your app's project directory:

```ruby
source 'https://github.com/CocoaPods/Specs.git'
pod 'React', :subspecs => ['Core', 'RCTImage', 'RCTNetwork', 'RCTText', 'RCTWebSocket'], :path => 'node_modules/react-native'
pod 'react-native-fbsdkcore', :path => 'node_modules/react-native-fbsdkcore'
```

Now run `pod install`. This will automatically download the Facebook SDK for iOS and create an Xcode workspace containing all native files. From now on open `YourApp.xcworkspace` instead of `YourApp.xcodeproject` in Xcode. Because React Native's iOS code is now pulled in via CocoaPods, you also need to remove the `React`, `RCTImage`, etc. subprojects from your app's Xcode project.

Follow the [Getting Started guide](https://developers.facebook.com/docs/ios/getting-started/) to set up a Facebook app, configure your Xcode project, and set up the app delegate. You can skip the steps that talk about downloading and linking the Facebook SDK frameworks -- that's already taken care of by CocoaPods.

## License
See the LICENSE file.

## Platform Policy
Developers looking to integrate with the Facebook Platform should familiarize themselves with the [Facebook Platform Policy](https://developers.facebook.com/policy/).
