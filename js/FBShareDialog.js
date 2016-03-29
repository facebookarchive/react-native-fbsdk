/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
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

const ShareDialog = require('react-native').NativeModules.FBShareDialog;
import type { ShareContent } from './models/FBShareContent';

type ShareDialogModeAndroid =
  /**
   * The mode is determined automatically.
   */
  "automatic"|
  /**
   * The native dialog is used.
   */
  "native"|
  /**
   * The web dialog is used.
   */
  "web"|
  /**
   * The feed dialog is used.
   */
  "feed";

type ShareDialogModeIOS =
  /*
   * Acts with the most appropriate mode that is available.
   */
  'automatic'|
  /*
   * Displays the dialog in Safari.
   */
  'browser'|
  /*
   * Displays the dialog in a UIWebView within the app.
   */
  'webview';

type ShareDialogMode = ShareDialogModeIOS | ShareDialogModeAndroid;

module.exports = {
  /**
   * Check if the dialog can be shown.
   */
  canShow(shareContent: ShareContent): Promise<boolean> {
    return ShareDialog.canShow(shareContent);
  },

  /**
   * Shows the dialog using the specified content.
   */
  show(shareContent: ShareContent): Promise {
    return ShareDialog.show(shareContent);
  },

  /**
   * Sets the mode for the share dialog.
   */
  setMode(mode: ShareDialogMode) {
    ShareDialog.setMode(mode);
  },

  /**
   * Sets whether or not the native share dialog should fail when it encounters a data error.
   */
  setShouldFailOnDataError(shouldFailOnDataError: boolean) {
    ShareDialog.setShouldFailOnDataError(shouldFailOnDataError);
  },
};
