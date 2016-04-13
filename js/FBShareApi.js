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

const ShareApi = require('react-native').NativeModules.FBShareApi;
const ShareOpenGraphObject = require('./models/FBShareOpenGraphObject');
import type { ShareContent } from './models/FBShareContent';

module.exports = {
  /**
   * For Android only, check if the dialog can be shown.
   * @platform android
   */
  canShare(shareContent: ShareContent): Promise<boolean> {
    return ShareApi.canShare(shareContent);
  },

  /**
   * For iOS only, creates a User Owned Open Graph object without an action.
   * NOTE: Only one share action can be performed at a time.
   * @platform ios
   */
  createOpenGraphObject(openGraphObject: ShareOpenGraphObject): Promise {
    return ShareApi.createOpenGraphObject(openGraphObject);
  },

  /**
   * Shares the specified content with a message.
   * NOTE: Only one share action can be performed at a time.
   */
  share(shareContent: ShareContent, graphNode: string, message: string): Promise {
    return ShareApi.share(shareContent, graphNode, message);
  },
};
