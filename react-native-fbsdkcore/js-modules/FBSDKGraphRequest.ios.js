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
* @providesModule FBSDKGraphRequest
* @flow
*/

'use strict';

/*
 * Represents a Graph API request and provides batch request supports.
 */
class FBSDKGraphRequest {
  /*
   * Called upon completion or failure of the request.
   */
  callback: (error: ?Object, result: ?Object) => void;

  /*
   * The Graph API endpoint to use for the request, for example "me".
   */
  graphPath: string;

  /*
   * The request parameters.
   */
  parameters: Object;

  /*
   * The access token used by the request.
   */
  tokenString: ?string;

  /*
   * The Graph API version to use (e.g., "v2.0")
   */
  version: ?string;

  /*
   * The HTTPMethod to use for the request, for example "GET" or "POST".
   */
  HTTPMethod: ?string;

  /*
   * If set, disables the automatic error recovery mechanism.
   */
  graphErrorRecoveryDisabled: boolean;

  /*
   * The optional dictionary of parameters to include for this request.
   */
   batchParameters: ?Object;

  /*
   * Constructs a new Graph API request.
   *
   * @param ((error: ?Object, result: ?Object) => void) callback - Called upon completion or failure of the request.
   * @param (string) graphPath    - The Graph API endpoint to use for the request, for example "me".
   * @param (Object) parameters   - The request parameters, which can be objects of the following forms:
   *                                  { string: '...' }:   A simple JS string.
   *                                  { uri: 'data:...' }: A data URI string.
   * @param (string) tokenString  - The access token used by the request.
   * @param (string) version      - The Graph API version to use (e.g., "v2.0")
   * @param (string) HTTPMethod   - The HTTPMethod to use for the request, for example "GET" or "POST".
   */
  constructor(callback: (error: ?Object, result: ?Object) => void, graphPath: string, parameters: ?Object, tokenString: ?string, version: ?string, HTTPMethod: ?string) {
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
   *
   * @param (string) paramString - String to add.
   * @param (string) key         - Key to associate with the given string.
   */
  addStringParameter(paramString: string, key: string) {
    this.parameters[key] = { string: paramString };
  }

  /**
   * Adds a data parameter to the request.
   *
   * @param (string) mimeType   - MIME type of the data being added.
   * @param (string) dataString - String encoding the data being added.
   * @param (string) key        - Key to associate with the given data.
   */
  addDataParameter(mimeType: string, dataString: string, key: string) {
    this.parameters[key] = { uri: ('data:' + mimeType + ';base64,' + dataString) };
  }

  /*
   * Starts the Graph API request.
   *
   * @param (number) timeout - Optional timeout for the request given in seconds.
   */
  start(timeout: ?number) {
    // FBSDKGraphRequestManager required here to prevent circular dependency issues.
    var FBSDKGraphRequestManager = require('./FBSDKGraphRequestManager.ios.js');
    FBSDKGraphRequestManager.batchRequests([this], null, timeout);
  }
}

module.exports = FBSDKGraphRequest;
