/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

'use strict';

const Settings = require('react-native').NativeModules.FBSettings;

module.exports = {
  /**
   * For iOS only, get AdvertiserTrackingEnabled status.
   * @platform ios
   */
  getAdvertiserTrackingEnabled(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      Settings.getAdvertiserTrackingEnabled((result) => {
        resolve(result);
      });
    });
  },
  /**
   * For iOS only, set AdvertiserTrackingEnabled status, only works in iOS 14 and above.
   * @platform ios
   */
  setAdvertiserTrackingEnabled(ATE: boolean): Promise<boolean> {
    return new Promise((resolve, reject) => {
      Settings.setAdvertiserTrackingEnabled(ATE, (result) => {
        resolve(result);
      });
    });
  },
  /**
   * Set data processing options
   */
  setDataProcessingOptions(options: Array<string>, ...args: Array<number>) {
    let country: number = 0;
    if (typeof args[0] === 'number') {
      country = args[0];
    }
    let state: number = 0;
    if (typeof args[1] === 'number') {
      state = args[1];
    }
    Settings.setDataProcessingOptions(options, country, state);
  },
};
