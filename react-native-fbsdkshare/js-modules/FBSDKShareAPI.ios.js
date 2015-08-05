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
* @providesModule FBSDKShareAPI
* @flow
*/

'use strict';

import type * as FBSDKSharingContent from '../js-models/FBSDKSharingContent.ios.js';
import type * as FBSDKShareOpenGraphObject from '../js-models/FBSDKShareOpenGraphObject.ios.js';

var FBSDKShareAPIInterface = require('react-native').NativeModules.FBSDKShareAPI;

class FBSDKShareAPI {
  /**
   * Shares the specified content.
   * NOTE: Only one share action can be performed at a time.
   *
   * @param (FBSDKSharingContent) content                        - The content to be shared.
   * @param ((error: ?Object, result: ?Object) => void) callback - Called upon completion or error of the request.
   */
  static share(content: FBSDKSharingContent, graphNode: string, message: string, callback: (error: Object, result: Object) => void): void {
    FBSDKShareAPIInterface.share(content, graphNode, message, callback);
  }

  /**
   * Creates a User Owned Open Graph object without an action.
   * NOTE: Only one share action can be performed at a time.
   *
   * @param (FBSDKShareOpenGraphObject) openGraphObject          - The open graph object to create.
   * @param ((error: ?Object, result: ?Object) => void) callback - Called upon completion or error of the request.
   */
  static createOpenGraphObject(openGraphObject: FBSDKShareOpenGraphObject, callback: (couldSend: boolean) => void): void {
    FBSDKShareAPIInterface.createOpenGraphObject(openGraphObject, callback);
  }
}

module.exports = FBSDKShareAPI;
