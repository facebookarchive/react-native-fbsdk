# React Native FBSDK

React Native FBSDK is a wrapper around the iOS Facebook SDK and Android Facebook SDK, allowing for Facebook integration in [React Native](https://facebook.github.io/react-native/) apps. Access to native components, from login to sharing, is provided entirely through documented JavaScript modules so you don't have to call a single native function directly.

Functionality is provided through one single npm package so you can use it for both platforms without downloading any extra packages. Follow this guide to use react-native-fbsdk in your React Native app. You can also visit https://developers.facebook.com/docs/react-native for tutorials and reference documentation.

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#join-the-react-native-community)
- [License](#license)

---

## Installation

## React Native Compatibility
To use this library you need to ensure you match up with the correct version of React Native you are using.

| `react-native-fbsdk` version | Required React Native Version                                                     |
| ----------------------------------------- | --------------------------------------------------------------------------------- |
| `>= 1.0.0`                                   | `>= 0.60`                                                                     |
| `<= 0.10`                                   | `<= 0.59.x`                                                                         |

### 1. Install the library

using either Yarn:

```
yarn add react-native-fbsdk
```

or npm:

```
npm install --save react-native-fbsdk
```

### 2. Link

- **React Native 0.60+**


[CLI autolink feature](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) links the module while building the app. 


- **React Native <= 0.59**


```bash
$ react-native link react-native-fbsdk
```

*Note* For `iOS` using `cocoapods`, run:

```bash
$ cd ios/ && pod install
```

If you can't or don't want to use the CLI tool, you can also manually link the library using the instructions below (click on the arrow to show them):

<details>
<summary>Manually link the library on iOS</summary>

Either follow the [instructions in the React Native documentation](https://facebook.github.io/react-native/docs/linking-libraries-ios#manual-linking) to manually link the framework or link using [Cocoapods](https://cocoapods.org) by adding this to your `Podfile`:

```ruby
pod 'react-native-fbsdk', :path => '../node_modules/react-native-fbsdk'
```

</details>

<details>
<summary>Manually link the library on Android</summary>

Make the following changes:

#### `android/settings.gradle`
```groovy
include ':react-native-fbsdk'
project(':react-native-fbsdk').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-fbsdk/android')
```

#### `android/app/build.gradle`
```groovy
dependencies {
   ...
   implementation project(':react-native-fbsdk')
}
```

#### `android/app/src/main/.../MainApplication.java`
On top, where imports are:

```java
import com.facebook.reactnative.androidsdk.FBSDKPackage;
```

Add the `FBSDKPackage` class to your list of exported packages.

```java
@Override
protected List<ReactPackage> getPackages() {
    return Arrays.asList(
            new MainReactPackage(),
            new FBSDKPackage()
    );
}
```
</details>

### 3. Configure projects

#### 3.1 Android

Before you can run the project, follow the [Getting Started Guide](https://developers.facebook.com/docs/android/getting-started/) for Facebook Android SDK to set up a Facebook app. You can skip the build.gradle changes since that's taken care of by the rnpm link step above, but **make sure** you follow the rest of the steps such as updating `strings.xml` and `AndroidManifest.xml`.

#### 3.2 iOS

Follow ***steps 3 and 4*** in the [Getting Started Guide](https://developers.facebook.com/docs/ios/getting-started/) for Facebook SDK for iOS.

**If you're not using cocoapods already** you can also follow step 2 to set it up.

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

2. Duplicate symbol errors

- Make sure that `FBSDK[Core, Login, Share]Kit.framework` are **NOT** in `Link Binary with Libraries` for your **root project** when using cocoapods.

3. I get this build error: `no type or protocol named UIApplicationOpenURLOptionsKey`:

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

## Example app

- Run `yarn start` in the repo root to start the packager for the example app

### iOS

- Run `pod install` in `example/ios`
- Open `example/ios/RNFBSDKExample.xcworkspace` with xcode
- Run the example app

### Android

- Start a simulator
- Run `./gradlew installDebug` in `example/android`

## Join the React Native community

- Website: https://facebook.github.io/react-native
- Twitter: https://twitter.com/reactnative

See the [CONTRIBUTING](./CONTRIBUTING.md) file for how to help out.

## License

See the LICENSE file.

## Platform Policy

Developers looking to integrate with the Facebook Platform should familiarize themselves with the [Facebook Platform Policy](https://developers.facebook.com/policy/).
