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

// Forward declaration used instead of require to prevent circular reference
class FBSDKShareOpenGraphObject { }

/*
 * Represents an interface for adding and retrieving values to open graph objects and actions.
 */
class FBSDKShareOpenGraphValueContainer {
  _properties: Object;

  constructor(properties: ?Object) {
    this._properties = properties ? properties : {};
  }

  /**
   * Sets an array for the specified key.
   * Elements in array must be objects conforming to the following format:
   * {
   *   type: oneOf(['array', 'number', 'open-graph-object', 'photo', 'string', 'url'],
   *   value: ...
   * }
   *
   * @param (Array<Object>) array - Array to add to the container.
   * @param (string) key          - Key to associate with the given value.
   */
  setArray(array: Array<Object>, key: string): void {
    this._properties[key] = { type: 'array', value: array};
  }

  /**
   * Sets a number for the specified key.
   *
   * @param (number) number - Number to add to the container.
   * @param (string) key          - Key to associate with the given value.
   */
  setNumber(number: number, key: string): void {
    this._properties[key] = { type: 'number', value: number};
  }

  /**
   * Sets an open graph object for the specified key.
   *
   * @param (FBSDKShareOpenGraphObject) object - Open graph object to add to the container.
   * @param (string) key                       - Key to associate with the given value.
   */
  setObject(object: FBSDKShareOpenGraphObject, key: string): void {
    this._properties[key] = { type: 'open-graph-object', value: object };
  }

  /**
   * Sets a photo for the specified key.
   *
   * @param (FBSDKSharePhoto) photo - Photo to add to the container.
   * @param (string) key            - Key to associate with the given value.
   */
  setPhoto(photo: FBSDKSharePhoto, key: string): void {
    this._properties[key] = { type: 'photo', value: photo };
  }

  /**
   * Sets a string for the specified key.
   *
   * @param (string) string - String to add to the container.
   * @param (string) key    - Key to associate with the given value.
   */
  setString(string: string, key: string): void {
    this._properties[key] = { type: 'string', value: string };
  }

  /**
   * Sets a url for the specified key.
   *
   * @param (string) url - String representation of a URL to add to the container.
   * @param (string) key - Key to associate with the given value.
   */
  setURL(url: string, key: string): void {
    this._properties[key] = { type: 'url', value: url };
  }

  /**
   * Gets an entry for the given key.
   * Entry is returned as an object with the following format:
   * {
   *   type: oneOf(['array', 'number', 'open-graph-object', 'photo', 'string', 'url'],
   *   value: ...
   * }
   *
   * @param (string) key - Key of the value to retrieve.
   */
   getEntry(key: string): any {
     return this._properties[key];
   }
}

module.exports = FBSDKShareOpenGraphValueContainer;
