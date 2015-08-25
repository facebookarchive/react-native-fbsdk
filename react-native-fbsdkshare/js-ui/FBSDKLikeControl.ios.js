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

var React = require('react-native');
var {
  requireNativeComponent,
  StyleSheet,
} = React;

/**
 * UI control to like an object in the Facebook graph.
 */
class FBSDKLikeControl extends React.Component {
  render() {
    return (
      <RCTFBSDKLikeControl
        {...this.props}
        style={this.props.style || styles.fbsdkLikeControl}
      />
    );
  }
}

FBSDKLikeControl.propTypes = {
  /**
   * The objectID for the object to like.
   */
  objectID: React.PropTypes.string.isRequired,

  /**
   * The type of object referenced by the objectID.
   */
  objectType: React.PropTypes.oneOf([
    'open-graph',
    'page',
    'unknown',
  ]),

  /**
   * The foreground color to use for the content of the receiver.
   */
  foregroundColor: React.PropTypes.string,

  /**
   * The position for the auxiliary view for the receiver.
   */
  likeControlAuxiliaryPosition: React.PropTypes.oneOf([
    'bottom',
    'inline',
    'top',
  ]),

  /**
   * The text alignment of the social sentence.
   */
  likeControlHorizontalAlignment: React.PropTypes.oneOf([
    'center',
    'left',
    'right',
  ]),

  /**
   * The style to use for the receiver.  Distinct from React styling.
   */
  likeControlStyle: React.PropTypes.oneOf([
    'standard',
    'box-count',
  ]),

  /**
   * If true, a sound is played when the receiver is toggled.
   */
  soundEnabled: React.PropTypes.bool,
};

var styles = StyleSheet.create({
  /**
   * Default styling for the logout button
   */
  fbsdkLikeControl: {
    width: 100,
    height: 25,
  },
});

var RCTFBSDKLikeControl = requireNativeComponent(
  'RCTFBSDKLikeControl',
  FBSDKLikeControl
);
module.exports = FBSDKLikeControl;
