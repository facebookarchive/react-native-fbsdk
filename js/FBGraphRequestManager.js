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

const NativeGraphRequestManager = require('react-native').NativeModules.FBGraphRequest;

import type GraphRequest from './FBGraphRequest';

function _verifyParameters(request: GraphRequest) {
  if (request.config && request.config.parameters) {
    for (var key in request.config.parameters) {
      var param = request.config.parameters[key];
      if (typeof param === 'object' && param.string) {
        continue;
      }
      throw new Error(
        'Unexpected value for parameter \'' + key + '\'. Request parameters ' +
          'need to be objects with a \'string\' field.'
      );
    }
  }
}

class FBGraphRequestManager {

  /**
   * Add a graph request.
   */
  addRequest(request: GraphRequest): FBGraphRequestManager {
    _verifyParameters(request);
    NativeGraphRequestManager.addToConnection(
      request,
      (error, result) => {
        if (request.callback) {
          if (typeof result === 'string') {
            try {
              result = JSON.parse(result);
            } catch (e) {
              return request.callback(e);
            }
          }
          return request.callback(error, result);
        }
      });
    return this;
  }

  /**
   * Add call back to the GraphRequestManager. Only one callback can be added.
   */
  addBatchCallback(callback: (error: ?Object, result: ?Object) => void): FBGraphRequestManager {
    NativeGraphRequestManager.addBatchCallback(callback);
    return this;
  }

  /**
   * Executes requests in a batch.
   */
  start(timeout: ?number) {
    NativeGraphRequestManager.start(timeout || 0);
  }
}

module.exports = FBGraphRequestManager;
