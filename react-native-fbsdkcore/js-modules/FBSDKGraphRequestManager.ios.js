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

var FBSDKNativeGraphRequestManager = require('react-native').NativeModules.FBSDKGraphRequestManager;

import type * as FBSDKGraphRequest from './FBSDKGraphRequest.ios.js';

function _verifyParameters(request: FBSDKGraphRequest) {
  for (var key in request.parameters) {
    var param = request.parameters[key];
    if (typeof param === 'object' && (param.string || param.uri)) {
      continue;
    }
    throw new Error(
      'Unexpected value for parameter \'' + key + '\'. Request parameters ' +
        'need to be objects with either a \'string\' or \'uri\' field.'
    );
  }
}

module.exports = {
  /**
   * Starts a batch of Graph API requests using the same connection.
   */
  batchRequests(
    requests: Array<FBSDKGraphRequest>,
    callback: ?(error: ?Object) => void,
    timeout: ?number
  ) {
    FBSDKNativeGraphRequestManager.addConnection((connectionID) => {
      requests.forEach((request) => {
        _verifyParameters(request);
        FBSDKNativeGraphRequestManager.addRequestToConnection(
          connectionID,
          request,
          request.batchParameters,
          request.callback
        );
      });
      FBSDKNativeGraphRequestManager.startConnection(
        connectionID,
        timeout,
        callback
      );
    });
  },
};
