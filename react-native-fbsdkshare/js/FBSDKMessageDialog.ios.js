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

var FBSDKMessageDialogInterface = require('react-native').NativeModules.FBSDKMessageDialog;

import type FBSDKSharingContent from './models/FBSDKSharingContent.ios.js';
import type {
  FBSDKDialogCallback,
} from './FBSDKShareTypes.ios.js';

module.exports = {
  /**
   * Check if the dialog can be shown
   */
  canShow(callback: (canShow:boolean) => void): void {
    FBSDKMessageDialogInterface.canShow(callback);
  },

  /**
   * Shows the message dialog.
   */
  show(callback: FBSDKDialogCallback) {
    FBSDKMessageDialogInterface.show(callback);
  },

  /**
   * Sets the message content.
   */
  setContent(content: FBSDKSharingContent): void {
    FBSDKMessageDialogInterface.setContent(content);
  },

  /**
   * Validates the content set on the dialog.
   */
  validateWithError(callback: (error: ?Object) => void) {
    FBSDKMessageDialogInterface.validateWithError(callback);
  },

  /**
   * Sets whether or not the native share dialog should fail when it
   * encounters a data error.
   */
  setShouldFailOnDataError(shouldFailOnDataError: boolean) {
    FBSDKMessageDialogInterface.shouldFailOnDataError(shouldFailOnDataError);
  },
};
