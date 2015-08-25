# React Native FBSDK
React Native FBSDK is a wrapper around the iOS Facebook SDK, allowing for Facebook integration in [React Native](https://facebook.github.io/react-native/) apps.  Access to native components, from login to sharing, is provided entirely through documented JavaScript modules so you never have to call a single native function directly.

Functionality is provided through three separate npm packages so you never have to include more than you need:
- `react-native-fbsdkcore`
- `react-native-fbsdkshare`
- `react-native-fbsdklogin`

## Usage
### react-native-fbsdkcore
#### Graph Requests
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

#### App events
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
### react-native-fbsdklogin
#### Login Button
```js
var FBSDKLogin = require('react-native-fbsdklogin');
var {
  FBSDKLoginButton,
} = FBSDKLogin;

var Login = React.createClass({
  render: function() {
    return (
      <View>
        <FBSDKLoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              alert('Error logging in.');
            } else {
              if (result.isCanceled) {
                alert('Login cancelled.');
              } else {
                alert('Logged in.');
              }
            }
          }}
          onLogoutFinished={() => alert('Logged out.')}
          readPermissions={[]}
          publishPermissions={['publish_actions']}/>
      </View>
    );
  }
});
```

#### Login Manager
```js
var FBSDKLogin = require('react-native-fbsdklogin');
var {
  FBSDKLoginManager,
} = FBSDKLogin;

// ...

// Attempt a login using the native login dialog asking for default permissions.
FBSDKLoginManager.setLoginBehavior(GlobalStore.getItem('behavior', 'native'));
FBSDKLoginManager.logInWithReadPermissions([], (error, result) => {
  if (error) {
    alert('Error logging in.');
  } else {
    if (result.isCanceled) {
      alert('Login cancelled.');
    } else {
      alert('Logged in.');
    }
  }
});

// ...
```
### react-native-fbsdkshare
#### Share dialogs
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

#### Share API
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

## Running the Sample App
- From the Sample folder, run `npm install`
- Download and install the [Facebook SDK for iOS](https://developers.facebook.com/docs/ios). The Xcode projects assume that they're installed in the standard location at `~/Documents/FacebookSDK`.
- Open `NHSample.xcodeproj`
- Build and run the app to try it out.

## Installation

### JavaScript packages

Depending on what functionality you're looking to integrate, install any of the following packages as npm dependencies:
  - `npm install --save react-native-fbsdkcore` for graph requests, app events, etc.
  - `npm install --save react-native-fbsdkshare` for share buttons, dialogs, etc.
  - `npm install --save react-native-fbsdklogin` for login button and manager.

### Native iOS code

You will also have to add the native iOS code from these packages as well as the Facebook SDK for iOS to your app's XCode. There are multiple ways of doing this.

Note: Any of the options below assume you've already installed the npm packages as mentioned above.

#### Option: Using [CocoaPods](https://cocoapods.org)

Assuming you have [CocoaPods](https://cocoapods.org) installed, create a `PodFile` like this in your app's project directory. You can leave out the modules you don't need.

```ruby
source 'https://github.com/CocoaPods/Specs.git'
pod 'React', :subspecs => ['Core', 'RCTImage', 'RCTNetwork', 'RCTText', 'RCTWebSocket'], :path => 'node_modules/react-native'
pod 'react-native-fbsdkcore', :path => 'node_modules/react-native-fbsdkcore'
pod 'react-native-fbsdklogin', :path => 'node_modules/react-native-fbsdklogin'
pod 'react-native-fbsdkshare', :path => 'node_modules/react-native-fbsdkshare'
```

Now run `pod install`. This will automatically download the Facebook SDK for iOS and create an Xcode workspace containing all native files. From now on open `YourApp.xcworkspace` instead of `YourApp.xcodeproject` in Xcode. Because React Native's iOS code is now pulled in via CocoaPods, you also need to remove the `React`, `RCTImage`, etc. subprojects from your app's Xcode project.

Follow the [Getting Started guide](https://developers.facebook.com/docs/ios/getting-started/) to set up a Facebook app, configure your Xcode project, and set up the app delegate. You can skip the steps that talk about downloading and linking the Facebook SDK frameworks -- that's already taken care of by CocoaPods.

#### Option: Using the provided Xcode projects

Download and install the [Facebook SDK for iOS](https://developers.facebook.com/docs/ios) into the standard location at `~/Documents/FacebookSDK`. Follow the [Getting Started guide](https://developers.facebook.com/docs/ios/getting-started/) to link your app's project with the Facebook SDK frameworks and set up the app delegate.

Add any of the following Xcode projects to your app's Xcode project:
- `node_modules/react-native-fbsdkcore/RCTFBSDKCore.xcodeproj`
- `node_modules/react-native-fbsdklogin/RCTFBSDKLogin.xcodeproj`
- `node_modules/react-native-fbsdkshare/RCTFBSDKShare.xcodeproj`]
Follow the [Linking Libraries (iOS) guide](http://facebook.github.io/react-native/docs/linking-libraries-ios.html) for each of them to make sure they're added correctly to your project's build targets.

#### Option: Manually add files to Xcode

Download and install the [Facebook SDK for iOS](https://developers.facebook.com/docs/ios) into the standard location at `~/Documents/FacebookSDK`. Follow the [Getting Started guide](https://developers.facebook.com/docs/ios/getting-started/) to link your app's project with the Facebook SDK frameworks and set up the app delegate.

Drag any of the following directories into your app's Xcode project:
- `node_modules/react-native-fbsdkcore/iOS`
- `node_modules/react-native-fbsdklogin/iOS`
- `node_modules/react-native-fbsdkshare/iOS`
Keep in mind that if you update any of the `react-native-fbsdk` modules, files may have been added, removed, or renamed.


#### All options: configure your app



### Troubleshooting
- If you get a build error stating that one of the Facebook SDK files was not found -- eg. `FBSDKCoreKit/FBSDKCoreKit.h` -- check two things\:
  - Ensure that the Facebook SDK frameworks are installed and in the right place.
  - Add the folder where the Facebook SDK was to the project's framework search path in Xcode. See Apple's [documentation on including frameworks](https://developer.apple.com/library/mac/documentation/MacOSX/Conceptual/BPFrameworks/Tasks/IncludingFrameworks.html).

## License
See the LICENSE file.

## Platform Policy
Developers looking to integrate with the Facebook Platform should familiarize themselves with the [Facebook Platform Policy](https://developers.facebook.com/policy/).
