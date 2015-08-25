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

var FBSDKSharingContent = require('./FBSDKSharingContent.ios.js');
import type * as FBSDKShareOpenGraphAction from './FBSDKShareOpenGraphAction.ios.js';

/**
 * Represents a content object containing information about an Open Graph Action.
 */
class FBSDKShareOpenGraphContent extends FBSDKSharingContent {
  /**
   * Open Graph Action to be shared.
   */
  action: FBSDKShareOpenGraphAction;

  /**
   * Property name that points to the primary Open Graph Object in the action.
   */
  previewPropertyName: string;

  /**
   * Constructs a content object representing an Open Graph Action for sharing.
   *
   * The `previewPropertyName` parameter is a property name that
   * points to the primary Open Graph Object in the action.
   */
  constructor(action: FBSDKShareOpenGraphAction, previewPropertyName: string) {
    super('open-graph');
    this.action = action;
    this.previewPropertyName = previewPropertyName;
  }
}

module.exports = FBSDKShareOpenGraphContent;
