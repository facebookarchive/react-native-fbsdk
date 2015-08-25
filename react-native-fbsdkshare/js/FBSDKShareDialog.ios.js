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

var FBSDKShareDialogInterface = require('react-native').NativeModules.FBSDKShareDialog;

import type * as FBSDKSharingContent from './models/FBSDKSharingContent.ios.js';
import type {
  FBSDKDialogCallback,
} from './FBSDKShareTypes.ios.js';

/**
 * Modes for the FBSDKShareDialog.
 */
type FBSDKShareDialogMode = $Enum<{
  // Acts with the most appropriate mode that is available.
  'automatic': string,
  // Displays teh dialog in the main native Facebook app.
  'native': string,
  // Displays the dialog in the iOS integrated share sheet.
  'share-sheet': string,
  // Displays the dialog in Safari.
  'browser': string,
  // Displays the dialog in a UIWebView within the app.
  'web': string,
  // Displays the feed dialog in Safari.
  'feed-browser': string,
  // Displays the feed dialog in a UIWebView within the app.
  'feed-web': string,
}>;

module.exports = {
  /**
   * Shows the dialog using the specified content.
   */
  show(content: FBSDKSharingContent, callback: FBSDKDialogCallback) {
    FBSDKShareDialogInterface.show(content, callback);
  },

  /**
   * Sets the mode with which to display the dialog.
   */
  setMode(mode: FBSDKShareDialogMode) {
    FBSDKShareDialogInterface.setMode(mode);
  },

  /**
   * Sets whether or not the native share dialog should fail when it encounters a data error.
   */
  setShouldFailOnDataError(shouldFailOnDataError: boolean) {
    FBSDKShareDialogInterface.shouldFailOnDataError(shouldFailOnDataError);
  },
};
