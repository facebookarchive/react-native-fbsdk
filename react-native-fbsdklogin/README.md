# react-native-fbsdklogin
A wrapper around the functionality from FBSDKLoginKit in the iOS Facebook SDK, supporting the login button and login manager.

## Usage
Below are usage examples for some of the components.

### Login Button
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

### Login Manager
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

## Sample App
A sample app is available from the [GitHub repository](https://github.com/facebook/react-native-fbsdk) for React Native FBSDK.

## Installation
- Download and install the [Facebook SDK for iOS](https://developers.facebook.com/docs/ios).
- Follow the [getting started guide](https://developers.facebook.com/docs/ios/getting-started/) to link your project with the Facebook SDK frameworks and set up the app delegate. `FBSDKCoreKit.framework` and `FBSDKLoginKit.framework` must be added to your app's Xcode project.
- Add the `react-native-fbsdklogin` package to your app's dependencies in `package.json` and run `npm install`.
- Add `RCTFBSDKLogin.xcodeproj` from `node_modules/react-native-fbsdklogin` to your Xcode project navigator.

## License
See the LICENSE file.

## Platform Policy
Developers looking to integrate with the Facebook Platform should familiarize themselves with the [Facebook Platform Policy](https://developers.facebook.com/policy/).
