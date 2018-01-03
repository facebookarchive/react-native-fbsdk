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

type GraphRequestCallback = (error: ?Object, result: ?Object) => void;
type GraphRequestConfig = {
  /**
   * The httpMethod to use for the request, for example "GET" or "POST".
   */
  httpMethod?: string,
  /**
   * The Graph API version to use (e.g., "v2.0")
   */
  version?: string,
  /**
   * The request parameters.
   */
  parameters?: GraphRequestParameters,
  /**
   * The access token used by the request.
   */
  accessToken?: string,
};
type GraphRequestParameters = {[key: string]: Object};

/**
 * Represents a Graph API request and provides batch request supports.
 */
class FBGraphRequest {
  /**
   * The Graph API endpoint to use for the request, for example "me".
   */
  graphPath: string;

  /**
   * The optional config for the request.
   */
  config: ?GraphRequestConfig;

  /**
   * Called upon completion or failure of the request.
   */
  callback: ?GraphRequestCallback;

  /**
   * Constructs a new Graph API request.
   */
  constructor(
    graphPath: string,
    config: ?GraphRequestConfig,
    callback: ?GraphRequestCallback,
  ) {
    this.graphPath = graphPath;
    this.config = config ? config : {};
    this.callback = callback ? callback : () => {};
  }

  /**
   * Adds a string parameter to the request.
   */
  addStringParameter(paramString: string, key: string) {
    if (this.config != null && this.config.parameters != null) {
      this.config.parameters[key] = {string: paramString};
    }
  }
}

module.exports = FBGraphRequest;
