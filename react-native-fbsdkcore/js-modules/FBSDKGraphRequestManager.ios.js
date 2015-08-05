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
* @providesModule FBSDKGraphRequestManager
* @flow
*/

'use strict';

var invariant = require('invariant');

var FBSDKNativeGraphRequestManager = require('NativeModules').FBSDKGraphRequestManager;

import type * as FBSDKGraphRequest from './FBSDKGraphRequest.ios.js';

/*
 * Represents a Graph API request and provides batch request supports.
 */
class FBSDKGraphRequestManager {
  /*
   * Starts a batch of Graph API requests using the same connection.
   *
   * @param (Array<FBSDKGraphRequest>) requests   - An array of Graph API requests to make.
   * @param (?(error: ?Object) => void) callback  - Called upon completion or failure of the connection attempt.
   * @param (number) timeout                      - Optional timeout for the batch request given in seconds.
   */
  static batchRequests(requests: Array<FBSDKGraphRequest>, callback: ?(error: ?Object) => void, timeout: ?number) {
    FBSDKNativeGraphRequestManager.addConnection((connectionID) => {
      for (var i = 0, il = requests.length; i < il; i++) {
        var request = requests[i];
        this._verifyParameters(request);
        FBSDKNativeGraphRequestManager.addRequestToConnection(connectionID, request, request.batchParameters, request.callback);
      }
      FBSDKNativeGraphRequestManager.startConnection(connectionID, timeout, callback);
    });
  }

  static _verifyParameters(request: FBSDKGraphRequest): void {
    for (var key in request.parameters) {
      var parameter = request.parameters[key];
      invariant(
        typeof parameter === 'object',
        'Expected parameter ' + JSON.stringify(parameter) + ' to be an object.'
      );
      if (typeof parameter === 'object') {
        invariant(
          parameter.string || parameter.uri,
          'Expected parameter ' + JSON.stringify(parameter) + ' to have string or uri fields.'
        );
      }
    }
  }
}

module.exports = FBSDKGraphRequestManager;
