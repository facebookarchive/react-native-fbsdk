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
* @providesModule FBSDKShareOpenGraphObject
* @flow
*/

'use strict';

var FBSDKShareOpenGraphValueContainer = require('./FBSDKShareOpenGraphValueContainer.ios.js');

/*
 * Represents an open graph object.
 */
class FBSDKShareOpenGraphObject extends FBSDKShareOpenGraphValueContainer {
  /*
   * Constructs an open graph object with the given properties.
   *
   * @param (Object) properties - An object containing the properties to intialize with. Elements should be of format:
   * {
   *   type: oneOf(['array', 'number', 'open-graph-object', 'photo', 'string', 'url'],
   *   value: ...
   * }
   */
  constructor(properties: Object) {
    super(properties);
  }
}

module.exports = FBSDKShareOpenGraphObject;
