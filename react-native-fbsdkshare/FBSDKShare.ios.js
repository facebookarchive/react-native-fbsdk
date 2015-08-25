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

// Share UI components
exports.FBSDKShareButton = require('./js/ui/FBSDKShareButton.ios.js');
exports.FBSDKSendButton = require('./js/ui/FBSDKSendButton.ios.js');
exports.FBSDKLikeControl = require('./js/ui/FBSDKLikeControl.ios.js');

// Share dialogs
exports.FBSDKShareDialog = require('./js/FBSDKShareDialog.ios.js');
exports.FBSDKMessageDialog = require('./js/FBSDKMessageDialog.ios.js');
exports.FBSDKAppGroupAddDialog = require('./js/FBSDKAppGroupAddDialog.ios.js');
exports.FBSDKAppGroupJoinDialog = require('./js/FBSDKAppGroupJoinDialog.ios.js');
exports.FBSDKAppInviteDialog = require('./js/FBSDKAppInviteDialog.ios.js');
exports.FBSDKGameRequestDialog = require('./js/FBSDKGameRequestDialog.ios.js');

// API
exports.FBSDKShareAPI = require('./js/FBSDKShareAPI.ios.js');

// Share content models
exports.FBSDKSharingContent = require('./js/models/FBSDKSharingContent.ios.js');
exports.FBSDKSharePhoto = require('./js/models/FBSDKSharePhoto.ios.js');
exports.FBSDKSharePhotoContent = require('./js/models/FBSDKSharePhotoContent.ios.js');
exports.FBSDKShareVideo = require('./js/models/FBSDKShareVideo.ios.js');
exports.FBSDKShareVideoContent = require('./js/models/FBSDKShareVideoContent.ios.js');
exports.FBSDKShareLinkContent = require('./js/models/FBSDKShareLinkContent.ios.js');
exports.FBSDKShareOpenGraphContent = require('./js/models/FBSDKShareOpenGraphContent.ios.js');
exports.FBSDKShareOpenGraphAction = require('./js/models/FBSDKShareOpenGraphAction.ios.js');
exports.FBSDKShareOpenGraphObject = require('./js/models/FBSDKShareOpenGraphObject.ios.js');
exports.FBSDKAppGroupAddContent = require('./js/models/FBSDKAppGroupAddContent.ios.js');
exports.FBSDKAppInviteContent = require('./js/models/FBSDKAppInviteContent.ios.js');
exports.FBSDKGameRequestContent = require('./js/models/FBSDKGameRequestContent.ios.js');
