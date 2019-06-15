# React Native FBSDK

React Native FBSDK is a wrapper around the iOS Facebook SDK and Android Facebook SDK, allowing for Facebook integration in [React Native](https://facebook.github.io/react-native/) apps. Access to native components, from login to sharing, is provided entirely through documented JavaScript modules so you don't have to call a single native function directly.

Functionality is provided through one single npm package so you can use it for both platforms without downloading any extra packages. Follow this guide to use react-native-fbsdk in your React Native app. You can also visit https://developers.facebook.com/docs/react-native for tutorials and reference documentation.

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#join-the-react-native-community)
- [License](#license)

---

## Installation

You will need either [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com) in order to install the SDK and configure the Android and iOS projects.

### 1. Create React Native project

First create a React Native project:

```bash
react-native init YourApp
```

### 2. Install JavaScript packages

Run `yarn` (or `npm install`, if using npm) inside your new `YourApp` directory:

```bash
cd YourApp
yarn
```

Then, install the `react-native-fbsdk` package:

```bash
yarn add react-native-fbsdk
```

> Or, if using npm:

```bash
npm install react-native-fbsdk
```

Finally, link the SDK to configure the iOS and Android projects:

```bash
react-native link react-native-fbsdk
```

### 3. Configure projects

#### 3.1 Android

Assuming you have [Android Studio](http://developer.android.com/sdk/index.html) installed, open the project with Android Studio.

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

Register SDK package in method `getPackages()`.

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

Also you need to add in your `settings.gradle`:

```
include ':react-native-fbsdk'
project(':react-native-fbsdk').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-fbsdk/android')
```

Before you can run the project, follow the [Getting Started Guide](https://developers.facebook.com/docs/android/getting-started/) for Facebook Android SDK to set up a Facebook app. You can skip the build.gradle changes since that's taken care of by the rnpm link step above, but **make sure** you follow the rest of the steps such as updating `strings.xml` and `AndroidManifest.xml`.

#### 3.2 iOS

The `react-native-fbsdk` has been linked by `react-native link`. The next step will be downloading and linking the native Facebook SDK for iOS.

Make sure you have the latest [Xcode](https://developer.apple.com/xcode/) installed. Open the .xcodeproj in Xcode found in the `ios` subfolder from your project's root directory. Now, follow ***all the steps except the pod install (Step 2)*** in the [Getting Started Guide](https://developers.facebook.com/docs/ios/getting-started/) for Facebook SDK for iOS. Along with `FBSDKCoreKit.framework`, don't forget to import `FBSDKShareKit.framework` and `FBSDKLoginKit.framework` into your Xcode project.

**If you're using React Native's RCTLinkingManager**

The `AppDelegate.m` file can only have one method for `openUrl`. If you're also using `RCTLinkingManager` to handle deep links, you should handle both results in your `openUrl` method.

```objc
- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  if ([[FBSDKApplicationDelegate sharedInstance] application:app openURL:url options:options]) {
    return YES;
  }

  if ([RCTLinkingManager application:app openURL:url options:options]) {
    return YES;
  }

  return NO;
}
```

### Troubleshooting

1. I cannot run the Android project.

- Make sure you added the code snippet in step 3.1.
- Make sure you set up a Facebook app and updated the `AndroidManifest.xml` and `res/values/strings.xml` with Facebook app settings.

2. I get a build error stating that one of the Facebook SDK files was not found -- eg. `FBSDKLoginKit/FBSDKLoginKit.h file not found`.

- Make sure that the Facebook SDK frameworks are installed in `~/Documents/FacebookSDK`.
- Make sure that `FBSDK[Core, Login, Share]Kit.framework` show up in the **Link Binary with Libraries** section of your build target's **Build Phases**.
- Make sure that `~/Documents/FacebookSDK` is in the **Framework Search Path** of your build target's **Build Settings**. You may have to select the `All` tab to see and search for the **Framework Search Path**.

3. I get build errors like `Warning: Native component for "RCTFBLikeView" does not exist`:

- Make sure that `libRCTFBSDK.a` shows up in the **Link Binary with Libraries** section of your build target's **Build Phases**.

4. I get this build error: `no type or protocol named UIApplicationOpenURLOptionsKey`:

- Your Xcode version is too old. Upgrade to Xcode 10.0+.

## Usage

### [Login](https://developers.facebook.com/docs/facebook-login)

#### Login Button + Access Token

```js
import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

export default class Login extends Component {
  render() {
    return (
      <View>
        <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>
      </View>
    );
  }
};
```

#### Requesting additional permissions with Login Manager

You can also use the Login Manager with custom UI to perform Login.

```js
// ...

import { LoginManager } from "react-native-fbsdk";

// ...

// Attempt a login using the Facebook login dialog asking for default permissions.
LoginManager.logInWithPermissions(["public_profile"]).then(
  function(result) {
    if (result.isCancelled) {
      console.log("Login cancelled");
    } else {
      console.log(
        "Login success with permissions: " +
          result.grantedPermissions.toString()
      );
    }
  },
  function(error) {
    console.log("Login fail with error: " + error);
  }
);
```

### [Sharing](https://developers.facebook.com/docs/sharing)

#### Share dialogs

All of the dialogs included are used in a similar way, with differing content types. All content types are defined with [Flow](http://flowtype.org/) Type Annotation in js/models directory.

```js
// ...

import { ShareDialog } from 'react-native-fbsdk';

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
        console.log('Share cancelled');
      } else {
        console.log('Share success with postId: '
          + result.postId);
      }
    },
    function(error) {
      console.log('Share fail with error: ' + error);
    }
  );
}
```

#### Share Photos

See [SharePhotoContent](/js/models/FBSharePhotoContent.js) and [SharePhoto](/js/models/FBSharePhoto.js) to refer other options.

```js
const FBSDK = require('react-native-fbsdk');
const {
  ShareApi,
} = FBSDK;

const photoUri = 'file://' + '/path/of/photo.png'
const sharePhotoContent = {
  contentType = 'photo',
  photos: [{ imageUrl: photoUri }],
}

// ...

ShareDialog.show(tmp.state.sharePhotoContent);
```

#### Share Videos

See [ShareVideoContent](/js/models/FBShareVideoContent.js) and [ShareVideo](/js/models/FBShareVideo.js) to refer other options.

```js
const FBSDK = require('react-native-fbsdk');
const {
  ShareApi,
} = FBSDK;

const videoUri = 'file://' + '/path/of/video.mp4'
const shareVideoContent = {
  contentType = 'video',
  video: { localUrl: videoUri },
}

// ...

ShareDialog.show(tmp.state.shareVideoContent);
```

#### Share API

Your app must have the `publish_actions` permission approved to share through the share API. You should prefer to use the Share Dialogs for an easier and more consistent experience.

```js
// ...

import { ShareApi } from 'react-native-fbsdk';

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
    console.log('Share with ShareApi success.');
  },
  function(error) {
    console.log('Share with ShareApi failed with error: ' + error);
  }
);
```

### [Analytics](https://developers.facebook.com/docs/app-events)

#### App events

```js
// ...

import { AppEventsLogger } from "react-native-fbsdk";

// ...

// Log a $15 purchase.
AppEventsLogger.logPurchase(15, "USD", { param: "value" });
```

### [Graph API](https://developers.facebook.com/docs/graph-api)

#### Graph Requests

```js
// ...

import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

// ...

//Create response callback.
_responseInfoCallback(error: ?Object, result: ?Object) {
  if (error) {
    console.log('Error fetching data: ' + error.toString());
  } else {
    console.log('Success fetching data: ' + result.toString());
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

## Join the React Native community

- Website: https://facebook.github.io/react-native
- Twitter: https://twitter.com/reactnative

See the [CONTRIBUTING](./CONTRIBUTING.md) file for how to help out.

## License

See the LICENSE file.

## Platform Policy

Developers looking to integrate with the Facebook Platform should familiarize themselves with the [Facebook Platform Policy](https://developers.facebook.com/policy/).
