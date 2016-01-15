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
* @provides FBSDKAppGroupJoinDialog
* @flow
*/

'use strict';

var FBSDKAppGroupJoinDialogInterface = require('react-native').NativeModules.FBSDKAppGroupJoinDialog;

import type {
  FBSDKDialogCallback,
} from './FBSDKShareTypes.ios.js';

module.exports = {
  /**
   * Check if the dialog can be shown
   */
  canShow(callback: (canShow:boolean) => void): void {
    FBSDKAppGroupJoinDialogInterface.canShow(callback);
  },

  /**
   * Shows the app group join dialog.
   */
  show(callback: FBSDKDialogCallback) {
    FBSDKAppGroupJoinDialogInterface.show(callback);
  },

  /**
   * Sets the group id
   */
  setGroupID(groupID: string) {
    FBSDKAppGroupJoinDialogInterface.setGroupID(groupID);
  },

  /**
   * Validates the content set on the dialog.
   */
  validateWithError(callback: (error: ?Object) => void) {
    FBSDKAppGroupJoinDialogInterface.validateWithError(callback);
  },
};
