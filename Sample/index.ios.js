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

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} = React;

var Login = require('./Login');
var Feed = require('./Feed');

/**
 * A sample app that demonstrates use of the FBSDK login button, native share dialog, and graph requests.
 */
var NHSample = React.createClass({
  render: function() {
    return (
      <Image
        source={{uri: 'plutoBack.png'}}
        style={styles.loginImage}>
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>Images taken from New Horizons Facebook page</Text>
        </View>
        <Login style={styles.loginContainer}/>
        <Feed style={styles.feedContainer}/>
      </Image>
    );
  }
});

var styles = StyleSheet.create(require('./styles.js'));

AppRegistry.registerComponent('NHSample', () => NHSample);
