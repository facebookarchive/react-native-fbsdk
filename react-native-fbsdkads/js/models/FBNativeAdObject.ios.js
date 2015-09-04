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

import type * as FBAdImage from './FBAdImage.ios.js';
import type * as FBAdStarRating from './FBAdStarRating.ios.js';

/**
 * A model representing a native ad.
 */
class FBNativeAdObject {

  /**
   * The title for the ad.
   */
  title: string;

  /**
   * The subtitle for the ad.
   */
  subtitle: string;

  /**
   * The icon for the ad.
   */
  icon: FBAdImage;

  /**
   * The social context for the ad.
   */
  socialContext: string;

  /**
   * The call to action for the ad.
   */
  callToAction: string;

  /**
   * The cover image for the ad.
   */
  coverImage: FBAdImage;

  /**
   * The body text of the ad.
   */
  body: string;

  /**
   * The placement ID of the ad.
   */
  placementID: string;

  /**
   * The star rating of the ad.
   */
  starRating: FBAdStarRating;

  /**
   * Construct a new FBNativeAdObject.
   */
  constructor(
    title: string,
    subtitle: string,
    icon: FBAdImage,
    socialContext: string,
    callToAction: string,
    body: string,
    placementID: string,
    starRating: FBAdStarRating,
    coverImage: FBAdImage
  ) {
    this.title = title;
    this.subtitle = subtitle;
    this.icon = icon;
    this.socialContext = socialContext;
    this.callToAction = callToAction;
    this.body = body;
    this.placementID = placementID;
    this.starRating = starRating;
    this.coverImage = coverImage;
  }
}

module.exports = FBNativeAdObject;
