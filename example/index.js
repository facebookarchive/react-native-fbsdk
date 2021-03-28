/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {Settings} from 'react-native-fbsdk';

/**
 * The `autoInitEnabled` option is removed from facebook-ios-sdk, should initialize manually
 * See https://github.com/facebook/facebook-ios-sdk/blob/master/CHANGELOG.md#removed
 */
if(Platform.OS === 'ios'){
  Settings.initializeSDK();
}

AppRegistry.registerComponent(appName, () => App);
