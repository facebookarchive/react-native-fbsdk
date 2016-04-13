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
 */
'use strict';

const AppEventsLogger = require('react-native').NativeModules.FBAppEventsLogger;
/**
 * Controls when an AppEventsLogger sends log events to the server
 */
type AppEventsFlushBehavior =
  /**
   * Flush automatically: periodically (every 15 seconds or after every 100 events), and
   * always at app reactivation. This is the default value.
   */
  'auto' |
  /**
   * Only flush when AppEventsLogger.flush() is explicitly invoked.
   */
  'explicity-only';
type Params = {[key: string]: string | number};

module.exports = {
  /**
   * Notifies the events system that the app has launched & logs an activatedApp event.
   */
  activateApp() {
    AppEventsLogger.activateApp();
  },

  /**
   * Notifies the events system that the app has been deactivated (put in the background)
   * and tracks the application session information.
   */
  deactivateApp() {
    AppEventsLogger.deactivateApp();
  },

  /**
   * Sets the current event flushing behavior specifying when events
   * are sent back to Facebook servers.
   */
  setFlushBehavior(flushBehavior: AppEventsFlushBehavior) {
    AppEventsLogger.setFlushBehavior(flushBehavior);
  },

  /**
   * Logs an event with eventName and optional arguments.
   * This function supports the following usage:
   * logEvent(eventName: string);
   * logEvent(eventName: string, valueToSum: number);
   * logEvent(eventName: string, parameters: {[key:string]:string|number});
   * logEvent(eventName: string, valueToSum: number, parameters: {[key:string]:string|number});
   * See https://developers.facebook.com/docs/app-events/android for detail.
   */
  logEvent(eventName: string, ...args: Array<number | Params>) {
    let valueToSum = 0;
    if (typeof args[0] === 'number') {
      valueToSum = args.shift();
    }
    let parameters = null;
    if (typeof args[0] === 'object') {
      parameters = args[0];
    }
    AppEventsLogger.logEvent(eventName, valueToSum, parameters);
  },

  /**
   * Logs a purchase. See http://en.wikipedia.org/wiki/ISO_4217 for currencyCode.
   */
  logPurchase(purchaseAmount: number, currencyCode: string, parameters: ?Object) {
    AppEventsLogger.logPurchase(purchaseAmount, currencyCode, parameters);
  },

  /**
   * Explicitly kicks off flushing of events to Facebook.
   */
  flush() {
    AppEventsLogger.flush();
  },
};
