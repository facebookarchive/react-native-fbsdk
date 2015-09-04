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

var FBNativeAdInterface = require('react-native').NativeModules.FBNativeAd;
var FBNativeAdObject = require('./models/FBNativeAdObject.ios.js');
var FBAdImage = require('./models/FBAdImage.ios.js');
var FBAdStarRating = require('./models/FBAdStarRating.ios.js');

import type {
  FBSDKNativeAdCallback,
} from './FBAdUtility.ios.js';

/**
 * Represents a Facebook Native Ad
 */
class FBNativeAd {
  /**
   * Loads a native ad with specified placement ID and passes it back using
   * the specified callback.
   */
  loadNativeAd(placementID: String, callback: FBSDKNativeAdCallback) {
    FBNativeAdInterface.loadNativeAd(
      placementID,
      (error, result) => {
        if (!error) {
          var nativeAd = new FBNativeAdObject(
            result.title,
            result.subtitle,
            new FBAdImage(
              result.icon.url,
              result.icon.width,
              result.icon.height
            ),
            result.socialContext,
            result.callToAction,
            result.body,
            result.placementID,
            new FBAdStarRating(
              result.starRating.value,
              result.starRating.scale
            ),
            new FBAdImage(
              result.coverImage.url,
              result.coverImage.width,
              result.coverImage.height
          ));
          callback(error, nativeAd);
        } else {
          callback(error, result);
        }
    });
  }
}

module.exports = FBNativeAd;
