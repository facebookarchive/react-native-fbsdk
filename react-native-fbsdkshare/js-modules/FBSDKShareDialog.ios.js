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
* @providesModule FBSDKShareDialog
* @flow
*/

'use strict';

var FBSDKShareDialogInterface = require('react-native').NativeModules.FBSDKShareDialog;

import type * as FBSDKSharingContent from '../js-models/FBSDKSharingContent.ios.js';

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

/**
 * A dialog for sharing content on Facebook.
 */
class FBSDKShareDialog {
  /**
   * Shows the dialog using the specified content.
   *
   * @param (FBSDKSharingContent) content                        - The content to be shared.
   * @param ((error: ?Object, result: ?Object) => void) callback - Called upon completion, error or cancellation of the dialog.
   */
  static show(content: FBSDKSharingContent, callback: (error: ?Object, result: ?Object) => void): void {
    FBSDKShareDialogInterface.show(content, callback);
  }

  /**
   * Sets the mode with which to display the dialog.
   *
   * @param (FBSDKShareDialogMode) mode - The mode to set the dialog to use when shown.
   */
  static setMode(mode: FBSDKShareDialogMode): void {
    FBSDKShareDialogInterface.setMode(mode);
  }

  /**
   * Sets whether or not the native share dialog should fail when it encounters a data error.
   *
   * @param (boolean) shouldFailOnDataError - Set to true if the dialog should fail on data error, otherwise false
   */
  static setShouldFailOnDataError(shouldFailOnDataError: boolean): void {
    FBSDKShareDialogInterface.shouldFailOnDataError(shouldFailOnDataError);
  }
}

module.exports = FBSDKShareDialog;
