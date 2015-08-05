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
* @providesModule FBSDKAccessToken
* @flow
*/

'use strict';

var FBSDKAccessTokenInterface = require('react-native').NativeModules.FBSDKAccessToken;

/*
 * Represents an immutable access token for using Facebook services.
 */
class FBSDKAccessToken {
  /*
   * The opaque token string.
   */
  tokenString: string;

  /*
   * The known granted permissions.
   */
  permissions: Array<string>;

  /*
   * The known declined permissions.
   */
  declinedPermissions: Array<string>;

  /*
   * The app ID.
   */
  appID: string;

  /*
   * The user ID.
   */
  userID: string;

  // Dates are stored as numbers to facilite transport to the native module
  _expirationDate: number;
  _refreshDate: number;

  /*
   * Constructs a new FBSDKAccessToken object.
   *
   * @param (string) tokenString                - The opaque token string.
   * @param (Array<string>) permissions         - The known granted permissions
   * @param (Array<string>) declinedPermissions - The known declined permissions
   * @param (string) appID                      - The app ID.
   * @param (string) userID                     - The user ID.
   * @param (Date) expirationDate               - The expiration date.
   * @param (Date) refreshDate                  - The date the token was last refreshed.
   */
  constructor(tokenString: string, permissions: Array<string>, declinedPermissions: Array<string>, appID: string, userID: string, expirationDate: Date, refreshDate: Date) {
    this.tokenString = tokenString;
    this.permissions = permissions;
    this.declinedPermissions = declinedPermissions;
    this.appID = appID;
    this.userID = userID;
    this._expirationDate = expirationDate.getTime();
    this._refreshDate = refreshDate.getTime();
    // This object should be immutable after creation.
    Object.freeze(this);
  }

  /*
   * Gets the expiration date.
   *
   * @returns - Expiration date of the token.
   */
  expirationDate(): Date {
    return new Date(this._expirationDate);
  }

  /*
   * Gets the the date the token was last refreshed.
   *
   * @returns - Refresh date of the token.
   */
  refreshDate(): Date {
    return new Date(this._refreshDate);
  }

  /*
   * Indicates whether the specified permission has been granted.
   *
   * @param (string) permission - The permissions to check the status of.
   *
   * @returns - true if permission has been granted, otherwise false
   */
  hasGrantedPermission(permission: string): boolean {
    for (var i = 0; i < this.permissions.length; i++) {
      if (this.permissions[i] === permission) {
        return true;
      }
    }
    return false;
  }

  /*
   * Makes a request to retrieve the current access token.
   *
   * @param ((token: FBSDKAccessToken) => void) callback - Called with the current access token.
   */
  static getCurrentAccessToken(callback: (token: ?FBSDKAccessToken) => void) {
    FBSDKAccessTokenInterface.getCurrentAccessToken((tokenDict) => {
      if (tokenDict) {
        var convertedToken = new FBSDKAccessToken(
          tokenDict.tokenString,
          tokenDict.permissions,
          tokenDict.declinedPermissions,
          tokenDict.appID,
          tokenDict.userID,
          new Date(tokenDict._expirationDate),
          new Date(tokenDict._refreshDate));
        callback(convertedToken);
      } else {
        callback(null);
      }
    });
  }

  /*
   * Sets the current access token to the one provided.
   *
   * @param (FBSDKAccessToken) token  - An access token.
   * @param (() => void) callback     - Called upon setting of the access token.
   */
  static setCurrentAccessToken(token: FBSDKAccessToken) {
    FBSDKAccessTokenInterface.setCurrentAccessToken(token);
  }

  /*
   * Makes an attempt to refresh the current access token.
   *
   * @param ((response: Object) => void) callback - Called upon success or error refreshing the token.
   */
  static refreshCurrentAccessToken(callback: (response: Object) => void) {
    FBSDKAccessTokenInterface.refreshCurrentAccessToken(callback);
  }
}

module.exports = FBSDKAccessToken;
