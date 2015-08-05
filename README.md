# React Native FBSDK
React Native FBSDK is a wrapper around the iOS Facebook SDK, allowing for Facebook integration in [React Native](https://facebook.github.io/react-native/) apps.  Access to native components, from login to sharing, is provided entirely through documented JavaScript modules so you never have to call a single native function directly.

Functionality is provided through three separate npm packages so you never have to include more than you need:
- `react-native-fbsdkcore`
- `react-native-fbsdkshare`
- `react-native-fbsdklogin`

## Running the Sample App
- From the Sample folder, run `npm install`
- Download and install the [Facebook SDK for iOS](https://developers.facebook.com/docs/ios).
- Open NHSample.xcodeproj
- Drag `FBSDKCoreKit.framework`, `FBSDKLoginKit.framework`, and `FBSDKShareKit.framework` into the Frameworks group in the XCode project navigator.
- Build and run the app to try it out.

## Installation
- Download and install the [Facebook SDK for iOS](https://developers.facebook.com/docs/ios).
- Follow the [getting started guide](https://developers.facebook.com/docs/ios/getting-started/) to link your project with the Facebook SDK frameworks and set up the app delegate.
- Depending on what functionality you're looking to integrate, run any combination of the following:
  - `npm install react-native-fbsdkcore` for graph requests, app events, etc.
  - `npm install react-native-fbsdkshare` for share buttons, dialogs, etc.
  - `npm install react-native-fbsdklogin` for login button and manager.
- Open the Xcode project for your app.
- Drag the folders prefixed with react-native-fbsdk from node_modules into the XCode project navigator.

## License
See the LICENSE file.

## Platform Policy
Developers looking to integrate with the Facebook Platform should familiarize themselves with the [Facebook Platform Policy](https://developers.facebook.com/policy/).
