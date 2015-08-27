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

var FBSDKAppEventsInterface = require('react-native').NativeModules.FBSDKAppEvents;
var FBSDKAccessToken = require('./FBSDKAccessToken.ios.js');

/**
 * Specifies when events are sent to the server.
 */
type FBSDKAppEventsFlushBehavior = 'auto' | 'explicity-only';

module.exports = {
  /**
   * Logs an event.
   */
  logEvent(
    eventName: string,
    valueToSum: ?number,
    parameters: ?Object,
    accessToken: ?FBSDKAccessToken
  ) {
    FBSDKAppEventsInterface.logEvent(
      eventName,
      valueToSum,
      parameters,
      accessToken
    );
  },

  /**
   * Logs a purchase.
   */
  logPurchase(
    purchaseAmount: number,
    currency: string,
    parameters: ?Object,
    accessToken: ?FBSDKAccessToken
  ) {
    FBSDKAppEventsInterface.logPurchase(
      purchaseAmount,
      currency,
      parameters,
      accessToken
    );
  },

  /**
   * Sets the current event flushing behavior specifying when events
   * are sent back to Facebook servers.
   */
  setFlushBehavior(flushBehavior: FBSDKAppEventsFlushBehavior) {
    FBSDKAppEventsInterface.setFlushBehavior(flushBehavior);
  },

  /**
   * Sets the override app ID for app event logging.
   */
  setLoggingOverrideAppID(appID: string) {
    FBSDKAppEventsInterface.setLoggingOverrideAppID(appID);
  },

  /**
   * Explicitly kicks off flushing of events to Facebook.
   */
  flush() {
    FBSDKAppEventsInterface.flush();
  },
};
