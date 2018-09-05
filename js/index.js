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
 * @format
 */

'use strict';

module.exports = {
  //native models
  get ShareOpenGraphAction() {
    return require('./models/FBShareOpenGraphAction');
  },
  get ShareOpenGraphObject() {
    return require('./models/FBShareOpenGraphObject');
  },
  get ShareOpenGraphValueContainer() {
    return require('./models/FBShareOpenGraphValueContainer');
  },

  //native modules
  get AccessToken() {
    return require('./FBAccessToken');
  },
  get AppEventsLogger() {
    return require('./FBAppEventsLogger');
  },
  get AppInviteDialog() {
    return require('./FBAppInviteDialog');
  },
  get GameRequestDialog() {
    return require('./FBGameRequestDialog');
  },
  get GraphRequest() {
    return require('./FBGraphRequest');
  },
  get GraphRequestManager() {
    return require('./FBGraphRequestManager');
  },
  get LoginManager() {
    return require('./FBLoginManager');
  },
  get MessageDialog() {
    return require('./FBMessageDialog');
  },
  get ShareApi() {
    return require('./FBShareApi');
  },
  get ShareDialog() {
    return require('./FBShareDialog');
  },

  //native components
  get LikeView() {
    return require('./FBLikeView');
  },
  get LoginButton() {
    return require('./FBLoginButton');
  },
  get SendButton() {
    return require('./FBSendButton');
  },
  get ShareButton() {
    return require('./FBShareButton');
  },
};
