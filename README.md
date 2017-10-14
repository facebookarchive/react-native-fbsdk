# React Native FBSDK
React Native FBSDK is a wrapper around the iOS Facebook SDK and Android Facebook SDK, allowing for Facebook integration in [React Native](https://facebook.github.io/react-native/) apps. Access to native components, from login to sharing, is provided entirely through documented JavaScript modules so you don't have to call a single native function directly.

Functionality is provided through one single npm package so you can use it for both platforms without downloading any extra packages. Follow this guide to use react-native-fbsdk in your react-native app. You can also visit https://developers.facebook.com/docs/react-native for tutorials and reference documentation.

## GIVE FEEDBACK
Please post questions on sdk set up to stackoverflow for quicker response. Besides it's easier for others searching for similar questions.
Report bugs or issues to https://developers.facebook.com/bugs/

## Installation
You need to install the sdk with [npm](https://www.npmjs.com/) and configure native Android/iOS project in the react native project.
### 1. Create React Native project

First create a React Native project:
```ruby
react-native init YourApp
```

### 2. Install JavaScript packages

Install and link the react-native-fbsdk package:
```ruby
react-native install react-native-fbsdk
react-native link react-native-fbsdk
```
### 3. Configure native projects

#### 3.1 Android project
Assuming you have [Android Studio](http://developer.android.com/sdk/index.html) installed, open the project with Android Studio.

**If your react-native version is below 0.29.0**

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
Override `onActivityResult()`.
```java
@Override
public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    mCallbackManager.onActivityResult(requestCode, resultCode, data);
}
```
Before you can run the project, follow the [Getting Started Guide](https://developers.facebook.com/docs/android/getting-started/) for Facebook Android SDK to set up a Facebook app. You can skip the build.gradle changes since that's taken care of by the rnpm link step above, but ***make sure*** you follow the rest of the steps such as calling `FacebookSdk.sdkInitialize` and updating `strings.xml` and `AndroidManifest.xml`. Note that react-native project ***doesn't have*** the Application class, so you'll need to create an implementation of the Application class yourself.

**If your react-native version is 0.29 or above**

Go to `MainApplication.java` and `MainActivity.java` under `app/src/main/java/com/<project name>/` to complete setup.

In `MainApplication.java`,

Add an instance variable of type `CallbackManager` and its getter.
```java
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;
...

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }
    //...
```

Override `onCreate()` method
```java
@Override
public void onCreate() {
  super.onCreate();
  FacebookSdk.sdkInitialize(getApplicationContext());
  // If you want to use AppEventsLogger to log events.
  AppEventsLogger.activateApp(this);
}
```

Register sdk package in method `getPackages()`.
```java
private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new FBSDKPackage(mCallbackManager)
      );
    }
};
```

In `MainActivity.java`

Override `onActivityResult()` method
```java
import android.content.Intent;

public class MainActivity extends ReactActivity {

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
    //...
```

Before you can run the project, follow the [Getting Started Guide](https://developers.facebook.com/docs/android/getting-started/) for Facebook Android SDK to set up a Facebook app. You can skip the build.gradle changes since that's taken care of by the rnpm link step above, and the step of calling `FacebookSdk.sdkInitialize`. But **make sure** you follow the rest of the steps such as updating `strings.xml` and `AndroidManifest.xml`.

#### 3.2 iOS project
The react-native-fbsdk has been linked by rnpm, the next step will be downloading and linking the native Facebook SDK for iOS.
Make sure you have the latest [Xcode](https://developer.apple.com/xcode/) installed. Open the .xcodeproj in Xcode found in the `ios` subfolder from your project's root directory. Now, follow ***all the steps*** in the [Getting Started Guide](https://developers.facebook.com/docs/ios/getting-started/) for Facebook SDK for iOS. Along with `FBSDKCoreKit.framework`, don't forget to import `FBSDKShareKit.framework` and `FBSDKLoginKit.framework` into your Xcode project.

#### 3.3 Troubleshooting
1. I cannot run the Android project.

  - Make sure you added the code snippet in step 3.1.
  - Make sure you set up a Facebook app and updated the `AndroidManifest.xml` and `res/values/strings.xml` with Facebook app settings.

2. I get a build error stating that one of the Facebook SDK files was not found -- eg. `FBSDKLoginKit/FBSDKLoginKit.h file not found`.

  - Make sure that the Facebook SDK frameworks are installed in `~/Documents/FacebookSDK`.
  - Make sure that `FBSDK[Core, Login, Share]Kit.framework` show up in the **Link Binary with Libraries** section of your build target's **Build Phases**.
  - Make sure that `~/Documents/FacebookSDK` is in the **Framework Search Path** of your build target's **Build Settings**.

3. I get build errors like `Warning: Native component for "RCTFBLikeView" does not exist`:

  - Make sure that `libRCTFBSDK.a` shows up in the **Link Binary with Libraries** section of your build target's **Build Phases**.

4. I get this build error: `no type or protocol named UIApplicationOpenURLOptionsKey`:

  - Your XCode version is too old, upgrade to XCode 8.0+.

## Usage
### [Login](https://developers.facebook.com/docs/facebook-login)
#### Login Button + Access Token
```js
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
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
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    alert(data.accessToken.toString())
                  }
                )
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
### [Analytics](https://developers.facebook.com/docs/app-events)
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
_responseInfoCallback(error: ?Object, result: ?Object) {
  if (error) {
    alert('Error fetching data: ' + error.toString());
  } else {
    alert('Success fetching data: ' + result.toString());
  }
}

// Create a graph request asking for user information with a callback to handle the response.
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
