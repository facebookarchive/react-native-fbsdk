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

/**
 * Specifies the privacy of a group.
 */
type FBSDKAppGroupPrivacy =
  // Anyone can see the group, who's in in and what members post.
  'open' |
  // Anyone can see the group and who's in it, but only members can see posts.
  'closed';

/**
 * A model for creating an app group.
 */
class FBSDKAppGroupAddContent {
  /**
   * The description of the group.
   */
  groupDescription: string;

  /**
   * The name of the group.
   */
  name: string;

  /**
   * The privacy for the group.
   */
  privacy: FBSDKAppGroupPrivacy;

  /**
   * Construct a new FBSDKAppGroupAddContent object.
   */
  constructor(groupDescr: string, name: string, privacy: FBSDKAppGroupPrivacy) {
    this.groupDescription = groupDescr;
    this.name = name;
    this.privacy = privacy;
  }
}

module.exports = FBSDKAppGroupAddContent;
