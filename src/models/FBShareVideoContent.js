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

import type {ShareContentCommonParameters} from './FBShareContent';
import type {SharePhoto} from './FBSharePhoto';
import type {ShareVideo} from './FBShareVideo';

/**
 * A model for video content to be shared.
 */
export type ShareVideoContent = {
  /**
   * The type of content to be shared is photo.
   */
  contentType: 'video',

  /**
   * Common parameters for share content;
   */
  commonParameters?: ShareContentCommonParameters,

  /**
   * URL for the content being shared.
   */
  contentUrl?: string,

  /**
   * Video to be shared.
   */
  video: ShareVideo,

  /**
   *  Description of the video.
   */
  contentDescription?: string,

  /**
   * Title of the video.
   */
  contentTitle?: string,

  /**
   * The photo that represents the video.
   */
  previewPhoto?: SharePhoto,
};
