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
* @providesModule FBSDKGameRequestDialog
* @flow
*/

'use strict';

var FBSDKGameRequestDialogInterface = require('react-native').NativeModules.FBSDKGameRequestDialog;

import type * as FBSDKGameRequestContent from '../js-models/FBSDKGameRequestContent.ios.js';

/**
 * A dialog for sending game requests.
 */
class FBSDKGameRequestDialog {
  /**
   * Shows the dialog using the specified content.
   *
   * @param (FBSDKGameRequestContent) content                    - The content to be shared.
   * @param ((error: ?Object, result: ?Object) => void) callback - Called upon completion, error or cancellation of the dialog.
   */
  static show(content: FBSDKGameRequestContent, callback: (error: ?Object, result: ?Object) => void): void {
    FBSDKGameRequestDialogInterface.show(content, callback);
  }

  /**
   * Sets whether or not frictionless requests should be enabled.
   *
   * @param (boolean) frictionlessRequestsEnabled - Set to true if frictionless requests should be used, otherwise false
   */
  static setFrictionlessRequestsEnabled(frictionlessRequestsEnabled: boolean): void {
    FBSDKGameRequestDialogInterface.setFrictionlessRequestsEnabled(frictionlessRequestsEnabled);
  }
}

module.exports = FBSDKGameRequestDialog;
