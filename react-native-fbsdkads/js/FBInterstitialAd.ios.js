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

var FBInterstitialAdInterface = require('react-native').NativeModules.FBInterstitialAd;

var { NativeAppEventEmitter } = require('react-native');

import type {
  FBSDKAdEventListener,
} from './FBAdUtility.ios.js';

/* Represents a Facebook Interstitial Ad */
class FBInterstitialAd {

  subscription: ?Object;
  /**
   * Loads an interstitial ad with specified Placement ID and attaches
   * the specified event listener.
   */
  loadInterstitialAd(placementID: String, eventListener: FBSDKAdEventListener) {
    FBInterstitialAdInterface.loadInterstitialAd(placementID);
    this.subscription = NativeAppEventEmitter.addListener(
      'interstitialAdEvent',
      eventListener,
    );
  }

  /**
   * Displays an interstitial ad after it is loaded.
   */
  displayInterstitialAd() {
    FBInterstitialAdInterface.displayInterstitialAd();
  }

  /**
   * Unsubscribes the event listener.
   */
  unsubscribe() {
    if (this.subscription) {
      this.subscription.remove();
    }
  }
}

module.exports = FBInterstitialAd;
