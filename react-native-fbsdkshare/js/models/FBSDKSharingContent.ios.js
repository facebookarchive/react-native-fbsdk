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

type FBSDKShareContentType = 'link' | 'photo' | 'video' | 'open-graph';

/**
 * A base interface for content to be shared.
 */
class FBSDKSharingContent {
  /**
   * The type of content to be shared. eg. linkContent, photoContent, etc.
   */
  contentType: FBSDKShareContentType;

  /**
   * URL for the content being shared.
   */
  contentURL: string;

  /**
   * List of IDs for taggable people to tag with this content.
   */
  peopleIDs: Array<string>;

  /**
   * The ID for a place to tag with this content.
   */
  placeID: string;

  /**
   * A value to be added to the referrer URL when a person follows a link from
   * this shared content on feed.
   */
  ref: string;

  /**
   * Constructs an FBSDKSharingContent object.
   */
  constructor(contentType: FBSDKShareContentType) {
    this.contentType = contentType;
  }
}

module.exports = FBSDKSharingContent;
