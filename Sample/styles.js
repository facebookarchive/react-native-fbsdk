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
*/

'use strict';

module.exports = {
  disclaimerContainer: {
    flex: 0.075,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  disclaimerText: {
    fontSize: 12,
    color: 'white',
  },
  loginContainer: {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedContainer: {
    flex: 0.775,
  },
  loginImage: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  loginButton: {
    width: 200,
    height: 50,
    shadowRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
  },
  imageBox: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'column',
  },
  shareButton: {
    backgroundColor: '#3b5998',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareText: {
    fontSize: 18,
    color: 'white',
  },
};
