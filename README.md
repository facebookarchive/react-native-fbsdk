# React Native FBSDK
React Native FBSDK is a wrapper around the iOS Facebook SDK, allowing for Facebook integration in [React Native](https://facebook.github.io/react-native/) apps.  Access to native components, from login to sharing, is provided entirely through documented JavaScript modules so you never have to call a single native function directly.

Functionality is provided through three separate npm packages so you never have to include more than you need:
- `react-native-fbsdkcore`
- `react-native-fbsdkshare`
- `react-native-fbsdklogin`

# Usage
Examples for using various components can be found in the readme files for the individual npm packages.

## Running the Sample App
- From the Sample folder, run `npm install`
- Download and install the [Facebook SDK for iOS](https://developers.facebook.com/docs/ios).
- Open NHSample.xcodeproj
- Drag `FBSDKCoreKit.framework`, `FBSDKLoginKit.framework`, and `FBSDKShareKit.framework` from the ~/Documents/FacebookSDK folder into the Frameworks group in the XCode project navigator.
- Build and run the app to try it out.

## Installation
- Download and install the [Facebook SDK for iOS](https://developers.facebook.com/docs/ios).
- Follow the [getting started guide](https://developers.facebook.com/docs/ios/getting-started/) to link your project with the Facebook SDK frameworks and set up the app delegate.
- Depending on what functionality you're looking to integrate, run any combination of the following:
  - `npm install react-native-fbsdkcore` for graph requests, app events, etc. `FBSDKCoreKit.framework` must be added to the project.
  - `npm install react-native-fbsdkshare` for share buttons, dialogs, etc. `FBSDKCoreKit.framework` and `FBSDKShareKit.framework` must be added to the project.
  - `npm install react-native-fbsdklogin` for login button and manager. `FBSDKCoreKit.framework` and `FBSDKLoginKit.framework` must be added to the project.
- Open the Xcode project for your app.
- Drag the folders prefixed with react-native-fbsdk from node_modules into the XCode project navigator.

### Troubleshooting
- If you get a build error stating that one of the Facebook SDK files was not found -- eg. `FBSDKCoreKit/FBSDKCoreKit.h` -- check two things:x:
  - Ensure that the Facebook SDK frameworks have been added to the project.
  - Add the folder where the Facebook SDK was to the project's framework search path in Xcode. See Apple's [documentation on including frameworks](https://developer.apple.com/library/mac/documentation/MacOSX/Conceptual/BPFrameworks/Tasks/IncludingFrameworks.html).

## License
See the LICENSE file.

## Platform Policy
Developers looking to integrate with the Facebook Platform should familiarize themselves with the [Facebook Platform Policy](https://developers.facebook.com/policy/).
