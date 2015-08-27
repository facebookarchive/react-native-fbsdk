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

import type * as FBSDKSharePhoto from './FBSDKSharePhoto.ios.js';
import type * as FBSDKShareOpenGraphObject from './FBSDKShareOpenGraphObject.ios.js';
type FBSDKOpenGraphValueType =
  'array' |
  'number' |
  'open-graph-object' |
  'photo' |
  'string' |
  'url';
type FBSDKOpenGraphValue = {
  type: FBSDKOpenGraphValueType;
  value: any;
};
type FBSDKOpenGraphProperties = {[key: string]: FBSDKOpenGraphValue};

/**
 * Represents an interface for adding and retrieving values to open graph objects and actions.
 */
class FBSDKShareOpenGraphValueContainer {
  _properties: FBSDKOpenGraphProperties;

  constructor(properties: ?FBSDKOpenGraphProperties) {
    this._properties = properties ? properties : {};
  }

  /**
   * Sets an array for the specified key.
   */
  setArray(array: Array<FBSDKOpenGraphValue>, key: string) {
    this._properties[key] = { type: 'array', value: array};
  }

  /**
   * Sets a number for the specified key.
   */
  setNumber(number: number, key: string) {
    this._properties[key] = { type: 'number', value: number};
  }

  /**
   * Sets an open graph object for the specified key.
   */
  setObject(object: FBSDKShareOpenGraphObject, key: string) {
    this._properties[key] = { type: 'open-graph-object', value: object };
  }

  /**
   * Sets a photo for the specified key.
   */
  setPhoto(photo: FBSDKSharePhoto, key: string) {
    this._properties[key] = { type: 'photo', value: photo };
  }

  /**
   * Sets a string for the specified key.
   */
  setString(string: string, key: string) {
    this._properties[key] = { type: 'string', value: string };
  }

  /**
   * Sets a url for the specified key.
   */
  setURL(url: string, key: string) {
    this._properties[key] = { type: 'url', value: url };
  }

  /**
   * Gets an entry for the given key.
   */
   getEntry(key: string): FBSDKOpenGraphValue {
     return this._properties[key];
   }
}

module.exports = FBSDKShareOpenGraphValueContainer;
