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

var FBSDKGraphRequestManager = require('./FBSDKGraphRequestManager.ios.js');

type FBSDKGraphRequestCallback = (error: ?Object, result: ?Object) => void;
type FBSDKGraphRequestParameters = {[key: string]: Object};

/**
 * Represents a Graph API request and provides batch request supports.
 */
class FBSDKGraphRequest {
  /**
   * Called upon completion or failure of the request.
   */
  callback: FBSDKGraphRequestCallback;

  /**
   * The Graph API endpoint to use for the request, for example "me".
   */
  graphPath: string;

  /**
   * The request parameters.
   */
  parameters: FBSDKGraphRequestParameters;

  /**
   * The access token used by the request.
   */
  tokenString: ?string;

  /**
   * The Graph API version to use (e.g., "v2.0")
   */
  version: ?string;

  /**
   * The HTTPMethod to use for the request, for example "GET" or "POST".
   */
  HTTPMethod: ?string;

  /**
   * If set, disables the automatic error recovery mechanism.
   */
  graphErrorRecoveryDisabled: boolean;

  /**
   * The optional dictionary of parameters to include for this request.
   */
   batchParameters: ?Object;

  /**
   * Constructs a new Graph API request.
   */
  constructor(
    callback: FBSDKGraphRequestCallback,
    graphPath: string,
    parameters: ?FBSDKGraphRequestParameters,
    tokenString: ?string,
    version: ?string,
    HTTPMethod: ?string
  ) {
    this.callback = callback;
    this.graphPath = graphPath;
    this.parameters = parameters ? parameters : {};
    this.tokenString = tokenString;
    this.version = version;
    this.HTTPMethod = HTTPMethod;
    this.graphErrorRecoveryDisabled = false;
  }

  /**
   * Adds a string parameter to the request.
   */
  addStringParameter(paramString: string, key: string) {
    this.parameters[key] = { string: paramString };
  }

  /**
   * Adds a data parameter to the request.
   */
  addDataParameter(mimeType: string, dataString: string, key: string) {
    this.parameters[key] = { uri: ('data:' + mimeType + ';base64,' + dataString) };
  }

  /**
   * Starts the Graph API request.
   */
  start(timeout: ?number) {
    FBSDKGraphRequestManager.batchRequests(
      [this],
      () => {},
      timeout || 60,
    );
  }
}

module.exports = FBSDKGraphRequest;
