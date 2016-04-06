# React Native FBSDK
React Native FBSDK is a wrapper around the iOS Facebook SDK and Android Facebook SDK, allowing for Facebook integration in [React Native](https://facebook.github.io/react-native/) apps.  Access to native components, from login to sharing, is provided entirely through documented JavaScript modules so you don't have to call a single native function directly.

Functionality is provided through one single npm package so you can use it for both platforms without downloading any extra packages.  Follow this guide to use react-native-fbsdk in your react-native app.

## Installation
You need to install the sdk with [npm](https://www.npmjs.com/) and configure native Android/iOS project in the react native project. 
### 1. Create React Native project

First create a React Native project:
```ruby
react-native init YourApp
```

### 2. Install JavaScript packages

Install the react-native-fbsdk package:
```ruby
npm install --save react-native-fbsdk
```
### 3. Configure native projects
You can configure the iOS project and Android project both if you want to build a cross-platform app, or configure either side.

#### 3.1 Android project
Assuming you have [Android Studio](http://developer.android.com/sdk/index.html) installed, open the project with Android Studio and update the following files to build project with [Gradle](http://gradle.org/).

In `settings.gradle`, include the sdk subproject and specify the subproject path.
```ruby
//...
include ':react-native-fbsdk'
project(':react-native-fbsdk').projectDir = new File(settingsDir, '../node_modules/react-native-fbsdk/Android')
```

In `app/build.gradle`, enable multiDex support and add sdk to dependencies.
```ruby
defaultConfig {
    //...
    multiDexEnabled true
}
//...
dependencies {
    //...
    compile project(":react-native-fbsdk")
}
```

Go to `MainActivity.java` under `app/src/main/java/com/<project name>/` to complete setup.
Note that packages must be imported to use.

Add an instance variable of type `CallbackManager` in class.
```java
import android.content.Intent;     // <--- import
import android.os.Bundle;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;

public class MainActivity extends ReactActivity {
    CallbackManager mCallbackManager;
    //...
```
Register sdk package in method `getPackages()`.
```java
@Override
protected List<ReactPackage> getPackages() {
    mCallbackManager = new CallbackManager.Factory().create();
    ReactPackage packages[] = new ReactPackage[]{
        new MainReactPackage(),
        new FBSDKPackage(mCallbackManager),
    };
    return Arrays.<ReactPackage>asList(packages);
}
```
Initialize sdk in method `onCreate()`.
```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    FacebookSdk.sdkInitialize(getApplicationContext());
} 
```
Override `onActivityResult()`.
```java
@Override
public void onActivityResult(int requestCode, int resultCode, Intent data) {
    mCallbackManager.onActivityResult(requestCode, resultCode, data);
}
```
To use [AppEventsLogger](https://developers.facebook.com/docs/app-events), add method call to `activateApp`, `deactivateApp` and `onContextStop` in the corresponding life cycle events.
```java
import com.facebook.appevents.AppEventsLogger;     // <--- import

@Override
protected void onResume() {
    super.onResume();
    AppEventsLogger.activateApp(getApplicationContext());
}

@Override
protected void onPause() {
    super.onPause();
    AppEventsLogger.deactivateApp(getApplicationContext());
}

@Override
protected void onStop() {
    super.onStop();
    AppEventsLogger.onContextStop();
}
```

#### 3.2 iOS project
Assuming you have [CocoaPods](https://cocoapods.org) installed, complete the following steps:

In `<project name>/ios` directory, create a `Podfile` by running:
```ruby
pod init
```

Open the generated `Podfile` and add the following code inside the **project target**:
```ruby
target 'YourApp' do
  source 'https://github.com/CocoaPods/Specs.git'
  pod 'React', :subspecs => ['Core', 'RCTImage', 'RCTNetwork', 'RCTText', 'RCTWebSocket'], :path => '../node_modules/react-native'
  pod 'react-native-fbsdkcore', :path => '../node_modules/react-native-fbsdk/iOS/core'
  pod 'react-native-fbsdklogin', :path => '../node_modules/react-native-fbsdk/iOS/login'
  pod 'react-native-fbsdkshare', :path => '../node_modules/react-native-fbsdk/iOS/share'
end
```

Remove all the subprojects under `Libraries/` in Xcode. This is because React Native's iOS code will be pulled in via CocoaPods.

Run `pod install`. This will automatically download the Facebook SDK for iOS and create an Xcode workspace containing all native files. From now on open `YourApp.xcworkspace` instead of `YourApp.xcodeproj` in Xcode.

Note: When doing 'pod install', warnings like `The 'YourApp [Debug]' target overrides the 'OTHER_LDFLAGS' build setting ...` may show up. To solve this, go to Xcode's target **Build Setting** section, find `Other linker flags` and add `$(inherited)` in it.

### 3.3 Configure native sdk
After you configure the native project in 3.1 and/or 3.2, follow the Getting Started guide for [Android](https://developers.facebook.com/docs/android/getting-started/) and [iOS](https://developers.facebook.com/docs/ios/getting-started/) sdk to set up a Facebook app. You can skip the steps that talk about downloading and linking the Facebook SDK frameworks, -- that's already taken care of by the steps above.

### 3.4 Troubleshooting
If you get a build error stating that one of the Facebook SDK files was not found -- eg. `FBSDKCoreKit/FBSDKCoreKit.h` -- check two things\:
- Ensure that the Facebook SDK frameworks are installed and show up in your xcode workspace.
- Ensure the [schemes](https://developer.apple.com/library/ios/recipes/xcode_help-scheme_editor/Articles/SchemeDialog.html) (react-native-fbsdkcore, react-native-fbsdklogin, and react-native-fbsdkshare) can be run successfully.

## Usage
### [Login](https://developers.facebook.com/docs/facebook-login)
#### Login Button
```js
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
} = FBSDK;

var Login = React.createClass({
  render: function() {
    return (
      <View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                alert("login has finished with permissions: " + result.grantedPermissions)
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    );
  }
});
```
#### Requesting additional permissions with Login Manager
You can also use the Login Manager with custom UI to perform Login.
```js
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK;

// ...

// Attempt a login using the Facebook login dialog asking for default permissions.
LoginManager.logInWithReadPermissions(['public_profile']).then(
  function(result) {
    if (result.isCancelled) {
      alert('Login cancelled');
    } else {
      alert('Login success with permissions: '
        +result.grantedPermissions.toString());
    }
  },
  function(error) {
    alert('Login fail with error: ' + error);
  }
);
```
### [Sharing](https://developers.facebook.com/docs/sharing)
#### Share dialogs
All of the dialogs included are used in a similar way, with differing content types. All content types are defined with [Flow](http://flowtype.org/) Type Annotation in js/models directory.
```js
const FBSDK = require('react-native-fbsdk');
const {
  ShareDialog,
} = FBSDK;

// ...

// Build up a shareable link.
const shareLinkContent = {
  contentType: 'link',
  contentUrl: "https://facebook.com",
  contentDescription: 'Wow, check out this great site!',
};

// ...

// Share the link using the share dialog.
shareLinkWithShareDialog() {
  var tmp = this;
  ShareDialog.canShow(this.state.shareLinkContent).then(
    function(canShow) {
      if (canShow) {
        return ShareDialog.show(tmp.state.shareLinkContent);
      }
    }
  ).then(
    function(result) {
      if (result.isCancelled) {
        alert('Share cancelled');
      } else {
        alert('Share success with postId: '
          + result.postId);
      }
    },
    function(error) {
      alert('Share fail with error: ' + error);
    }
  );
}
```

#### Share API
Your app must have the `publish_actions` permission approved to share through the share API. You should prefer to use the Share Dialogs for an easier and more consistent experience.
```js
const FBSDK = require('react-native-fbsdk');
const {
  ShareApi,
} = FBSDK;

// ...

// Build up a shareable link.
const shareLinkContent = {
  contentType: 'link',
  contentUrl: "https://facebook.com",
  contentDescription: 'Wow, check out this great site!',
};

// ...

// Share using the share API.
ShareApi.canShare(this.state.shareLinkContent).then(
  var tmp = this;
  function(canShare) {
    if (canShare) {
      return ShareApi.share(tmp.state.shareLinkContent, '/me', 'Some message.');
    }
  }
).then(
  function(result) {
    alert('Share with ShareApi success.');
  },
  function(error) {
    alert('Share with ShareApi failed with error: ' + error);
  }
);
```
### [Analytics for Apps](https://developers.facebook.com/docs/app-events)
#### App events
```js
const FBSDK = require('react-native-fbsdk');
const {
  AppEventsLogger,
} = FBSDK;

// ...

// Log a $15 purchase.
AppEventsLogger.logPurchase(15, 'USD', {'param': 'value'})
```
### [Graph API](https://developers.facebook.com/docs/graph-api)
#### Graph Requests
```js
const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

// ...

//Create response callback.
_responseCallback(error: ?Object, result: ?Object) {
  if (error) {
    alert('Error posting data: ' + error.toString());
  } else {
    alert('Success posting data: ' + result.toString());
  }
}

// Create a graph request asking for user informations with a callback to handle the response.
const infoRequest = new GraphRequest(
  '/me',
  null,
  this._responseInfoCallback,
);
// Start the graph request.
new GraphRequestManager().addRequest(infoRequest).start();
```
## License
See the LICENSE file.

## Platform Policy
Developers looking to integrate with the Facebook Platform should familiarize themselves with the [Facebook Platform Policy](https://developers.facebook.com/policy/).
