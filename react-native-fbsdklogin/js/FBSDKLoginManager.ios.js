/**
* Copyright (c) 2015-present, Facebook, Inc. All rights reserved.
*
* You are hereby granted a non-exclusive, worldwide, royalty-free license to use,
* copy, modify, and distribute this software in source code or binary form for use
* in connection with the web services and APIs provided by Facebook.
*
* As with any software that integrates with the Facebook platform, your use of
* this software is subject to the Facebook Developer Principles and Policies
* [http://developers.facebook.com/policy/]. This copyright notice shall be
* included in all copies or substantial portions of the software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
* FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
* COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
* IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
* CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
* @flow
*/

'use strict';

var FBSDKLoginManagerInterface = require('react-native').NativeModules.FBSDKLoginManager;

type FBSDKLoginResult = {
  isCancelled: boolean;
  grantedPermissions: Array<string>;
  declinedPermissions: Array<string>;
};
export type FBSDKLoginCallback = (error: ?Object, result: ?FBSDKLoginResult) => void;

/**
 * Indicate how Facebook Login should be attempted.
 */
export type FBSDKLoginBehavior =
  // Attempts log in through the native Facebook app.
  'native' |
  // Attempts log in through the Safari browser.
  'browser' |
  // Attempts log in through the Facebook account currently signed in through Settings.
  'system-account' |
  // Attempts log in through a modal UIWebView pop-up.
  'web';

/**
 * Indicates which default audience to use for sessions that post data to Facebook.
 */
export type FBSDKDefaultAudience =
  // Indicates that the user's friends are able to see posts made by the application.
  'friends' |
  // Indicates that all Facebook users are able to see posts made by the application.
  'everyone' |
  // Indicates that only the user is able to see posts made by the application.
  'only-me';

module.exports = {
  /**
   * Sets the behavior for login attempts.
   */
  setLoginBehavior(loginBehavior: FBSDKLoginBehavior) {
    FBSDKLoginManagerInterface.setLoginBehavior(loginBehavior);
  },

  /**
   * Sets the default audience.
   */
  setDefaultAudience(defaultAudience: FBSDKDefaultAudience) {
    FBSDKLoginManagerInterface.setDefaultAudience(defaultAudience);
  },

  /**
   * Attempts a login with the specified read permissions.
   */
  logInWithReadPermissions(
    permissions: Array<string>,
    callback: FBSDKLoginCallback
  ) {
    FBSDKLoginManagerInterface.logInWithReadPermissions(permissions, callback);
  },

  /**
   * Attempts a login with the specified publish permissions.
   */
  logInWithPublishPermissions(
    permissions: Array<string>,
    callback: FBSDKLoginCallback
  ) {
    FBSDKLoginManagerInterface.logInWithPublishPermissions(permissions, callback);
  },

  /**
   * Logs out.
   */
  logOut() {
    FBSDKLoginManagerInterface.logOut();
  },

  /**
   * Attempts to renew the credentials for system account login.
   */
  renewSystemCredentials(callback: FBSDKLoginCallback) {
    FBSDKLoginManagerInterface.renewSystemCredentials(callback);
  },
};
