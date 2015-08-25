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

var FBSDKAccessTokenInterface = require('react-native').NativeModules.FBSDKAccessToken;

type AccessTokenDict = {
  tokenString: string;
  permissions: Array<string>;
  declinedPermissions: Array<string>;
  appID: string;
  userID: string;
  _expirationDate: number;
  _refreshDate: number;
};

/**
 * Represents an immutable access token for using Facebook services.
 */
class FBSDKAccessToken {
  /**
   * The opaque token string.
   */
  tokenString: string;

  /**
   * The known granted permissions.
   */
  permissions: Array<string>;

  /**
   * The known declined permissions.
   */
  declinedPermissions: Array<string>;

  /**
   * The app ID.
   */
  appID: string;

  /**
   * The user ID.
   */
  userID: string;

  // Dates are stored as numbers to facilite transport to the native module
  _expirationDate: number;
  _refreshDate: number;

  /**
   * Constructs a new FBSDKAccessToken object.
   */
  constructor(tokenDict: AccessTokenDict) {
    this.tokenString = tokenDict.tokenString;
    this.permissions = tokenDict.permissions;
    this.declinedPermissions = tokenDict.declinedPermissions;
    this.appID = tokenDict.appID;
    this.userID = tokenDict.userID;
    this._expirationDate = tokenDict._expirationDate;
    this._refreshDate = tokenDict._refreshDate;
    // This object should be immutable after creation.
    Object.freeze(this);
  }

  /**
   * Gets the expiration date.
   */
  getExpirationDate(): Date {
    return new Date(this._expirationDate);
  }

  /**
   * Gets the the date the token was last refreshed.
   */
  getRefreshDate(): Date {
    return new Date(this._refreshDate);
  }

  /**
   * Indicates whether the specified permission has been granted.
   */
  hasGrantedPermission(permission: string): boolean {
    return this.permissions.some((perm) => perm === permission);
  }

  /**
   * Makes a request to retrieve the current access token.
   */
  static getCurrentAccessToken(callback: (token: ?FBSDKAccessToken) => void) {
    FBSDKAccessTokenInterface.getCurrentAccessToken((tokenDict) => {
      callback(tokenDict ? new FBSDKAccessToken(tokenDict) : null);
    });
  }

  /**
   * Sets the current access token to the one provided.
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
