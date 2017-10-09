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

/**
 * A model for status and link content to be shared.
 */
export type ShareLinkContent = {
  /**
   * The type of content to be shared is link.
   */
  contentType: 'link',

  /**
   * Common parameters for share content;
   */
  commonParameters?: ShareContentCommonParameters,

  /**
   * URL for the content being shared.
   */
  contentUrl: string,

  /**
   * The Description of the link.
   * If not specified, this field is automatically populated by information scraped
   * from the contentURL,  typically the title of the page.
   * @deprecated `contentDescription` is deprecated from Graph API 2.9.
   * For more information, see https://developers.facebook.com/docs/apps/changelog#v2_9_deprecations.
   */
  contentDescription?: string,

  /**
   * The title to display for this link.
   * @deprecated `contentTitle` is deprecated from Graph API 2.9.
   * For more information, see https://developers.facebook.com/docs/apps/changelog#v2_9_deprecations.
   */
  contentTitle?: string,

  /**
   * The URL of a picture to attach to this comment.
   * @deprecated `imageUrl` is deprecated from Graph API 2.9.
   * For more information, see https://developers.facebook.com/docs/apps/changelog#v2_9_deprecations.
   */
  imageUrl?: string,

  /**
   * The predefine quote to attacth to this comment.
   * If specified, the quote text will render with custom styling on top of the link.
   */
  quote?: string,
};
