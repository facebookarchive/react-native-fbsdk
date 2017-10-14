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
* @format
*/

'use strict';

const NativeGraphRequestManager = require('react-native').NativeModules
  .FBGraphRequest;

import type GraphRequest from './FBGraphRequest';

type Callback = (error: ?Object, result: ?Object) => void;

function _verifyParameters(request: GraphRequest) {
  if (request.config && request.config.parameters) {
    for (var key in request.config.parameters) {
      var param = request.config.parameters[key];
      if (typeof param === 'object' && param.string) {
        continue;
      }
      throw new Error(
        "Unexpected value for parameter '" +
          key +
          "'. Request parameters " +
          "need to be objects with a 'string' field.",
      );
    }
  }
}

class FBGraphRequestManager {
  requestBatch: Array<GraphRequest>;
  requestCallbacks: Array<?Callback>;
  batchCallback: Callback;

  constructor() {
    this.requestBatch = [];
    this.requestCallbacks = [];
  }

  /**
   * Add a graph request.
   */
  addRequest(request: GraphRequest): FBGraphRequestManager {
    _verifyParameters(request);
    this.requestBatch.push(request);
    this.requestCallbacks.push(request.callback);
    return this;
  }

  /**
   * Add call back to the GraphRequestManager. Only one callback can be added.
   * Note that invocation of the batch callback does not indicate success of every
   * graph request made, only that the entire batch has finished executing.
   */
  addBatchCallback(
    callback: (error: ?Object, result: ?Object) => void,
  ): FBGraphRequestManager {
    this.batchCallback = callback;
    return this;
  }

  /**
   * Executes requests in a batch.
   * Note that when there's an issue with network connection the batch callback
   * behavior differs in Android and iOS.
   * On iOS, the batch callback returns an error if the batch fails with a network error.
   * On Android, the batch callback always returns {"result": "batch finished executing"}
   * after the batch time out. This is because detecting network status requires
   * extra permission and it's unncessary for the sdk. Instead, you can use the NetInfo module
   * in react-native to get the network status.
   */
  start(timeout: ?number) {
    const that = this;
    const callback = (error, result, response) => {
      if (response) {
        that.requestCallbacks.forEach((innerCallback, index, array) => {
          if (innerCallback) {
            innerCallback(response[index][0], response[index][1]);
          }
        });
      }
      if (that.batchCallback) {
        that.batchCallback(error, result);
      }
    };

    NativeGraphRequestManager.start(this.requestBatch, timeout || 0, callback);
  }
}

module.exports = FBGraphRequestManager;
