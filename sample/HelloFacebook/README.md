# HelloFacebook Sample App
HelloFacebook is a react-native app using react-native-fbsdk.
This app showcases a Facebook login button and a share dialog.

To run the iOS project,
```java
  npm install react
  npm install react-native
  react-native install react-native-fbsdk
  react-native link react-native-fbsdk
  mkdir ios/Frameworks  #make a local folder for the FBSDK frameworks
  curl -#L https://origincache.facebook.com/developers/resources/?id=facebook-ios-sdk-current.zip | bsdtar -xf- -C ./ios/Frameworks; #download the FBSDK
```
Now you can run the iOS app.

To run the Android project,
```java
  npm install react
  npm install react-native #install react-native
  react-native install react-native-fbsdk
  react-native link react-native-fbsdk
```
Now you can run the Android app.
