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
* @providesModule FBSDKLoginManager
* @flow
*/

'use strict';

var FBSDKLoginManagerInterface = require('react-native').NativeModules.FBSDKLoginManager;

/**
 * Indicate how Facebook Login should be attempted.
 */
type FBSDKLoginBehavior = $Enum<{
  // Attempts log in through the native Facebook app.
  'native': string,
  // Attempts log in through the Safari browser.
  'browser': string,
  // Attempts log in through the Facebook account currently signed in through Settings.
  'system-account': string,
  // Attempts log in through a modal UIWebView pop-up.
  'web': string,
}>;

/**
 * Indicates which default audience to use for sessions that post data to Facebook.
 */
type FBSDKDefaultAudience = $Enum<{
  // Indicates that the user's friends are able to see posts made by the application.
  'friends': string,
  // Indicates that all Facebook users are able to see posts made by the application.
  'everyone': string,
  // Indicates that only the user is able to see posts made by the application.
  'only-me': string,
}>;

/**
 * Provides methods for logging the user in and out.
 */
class FBSDKLoginManager {
  /**
   * Sets the behavior for login attempts.
   *
   * @param (FBSDKLoginBehavior) loginBehavior - The login behavior to use.
   */
  static setLoginBehavior(loginBehavior: FBSDKLoginBehavior): void {
    FBSDKLoginManagerInterface.setLoginBehavior(loginBehavior);
  }

  /**
   * Sets the default audience.
   *
   * @param (FBSDKDefaultAudience) defaultAudience - the Default audience to use.
   */
  static setDefaultAudience(defaultAudience: FBSDKDefaultAudience): void {
    FBSDKLoginManagerInterface.setDefaultAudience(defaultAudience);
  }

  /**
   * Attempts a login with the specified read permissions.
   *
   * @param (Array<string>) permissions - An array of read permissions to request.
   * @param ((error: ?Object, result: ?Object) => void) callback - Called upon error or completion of the login.
   */
  static logInWithReadPermissions(permissions: Array<string>, callback: (error: ?Object, result: ?Object) => void): void {
    FBSDKLoginManagerInterface.logInWithReadPermissions(permissions, callback);
  }

  /**
   * Attempts a login with the specified publish permissions.
   *
   * @param (Array<string>) permissions - An array of publish permissions to request.
   * @param ((error: ?Object, result: ?Object) => void) callback - Called upon error or completion of the login.
   */
  static logInWithPublishPermissions(permissions: Array<string>, callback: (error: ?Object, result: ?Object) => void): void {
    FBSDKLoginManagerInterface.logInWithPublishPermissions(permissions, callback);
  }

  /**
   * Attempt a logout.
   *
   * @param (() => void) callback - Called upon successful logout.
   */
  static logOut(callback: () => void): void {
    FBSDKLoginManagerInterface.logOut(callback);
  }

  /**
   * Attempts to renew the credentials for system account login.
   *
   * @param ((error: ?Object, result: ?Object) => void) callback - Called upon error or completion of credential renewal.
   */
  static renewSystemCredentials(callback: (error: ?Object, result: ?Object) => void): void {
    FBSDKLoginManagerInterface.renewSystemCredentials(callback);
  }
}

module.exports = FBSDKLoginManager;
