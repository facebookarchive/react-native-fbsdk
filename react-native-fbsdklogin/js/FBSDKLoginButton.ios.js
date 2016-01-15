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
  NativeModules,
  StyleSheet,
} = React;

import type {
  FBSDKLoginCallback,
  FBSDKLoginBehavior,
  FBSDKDefaultAudience,
} from './FBSDKLoginManager.ios.js';

type FBSDKLoginButtonProps = {
  readPermissions: Array<string>;
  publishPermissions: Array<string>;
  onLoginFinished: FBSDKLoginCallback;
  onLogoutFinished: () => void;
  loginBehavior: FBSDKLoginBehavior,
  defaultAudience: FBSDKDefaultAudience,
  tooltipBehavior: 'auto' | 'force-display' | 'disable',
};

type Event = Object;

/**
 * A button that initiates a log in or log out flow upon tapping.
 */
class FBSDKLoginButton extends React.Component {
  props: FBSDKLoginButtonProps;

  _eventHandler(event: Object) {
    var eventDict = event.nativeEvent;
    if (eventDict.type === 'loginFinished') {
      if (this.props.onLoginFinished) {
        this.props.onLoginFinished(eventDict.error, eventDict.result);
      }
    } else if (eventDict.type === 'logoutFinished') {
      if (this.props.onLogoutFinished) {
        this.props.onLogoutFinished();
      }
    }
  }

  render() {
    var onWillLogin = this.props.onWillLogin && ((event: Event) => {
      var willLogin = this.props.onWillLogin &&
        this.props.onWillLogin(event.nativeEvent);
      if (typeof willLogin === 'undefined') {
        willLogin = true; // default to true if no value returned
      }
      NativeModules.FBSDKLoginButtonManager
        .resumeLoginWithResult(!!willLogin, event.nativeEvent.lockIdentifier);
    });
    
    return (
      <RCTFBSDKLoginButton
        {...this.props}
        style={this.props.style || styles.fbsdkLoginButton}
        onChange={this._eventHandler.bind(this)}
        onWillLogin={onWillLogin}
      />
    );
  }
}

FBSDKLoginButton.propTypes = {
  /**
   * Represents the read permissions to request when the login button
   * is pressed.
   */
  readPermissions: React.PropTypes.array,

  /**
   * Represents the publish permissions to request when the login
   * button is pressed.
   */
  publishPermissions: React.PropTypes.array,

  /**
   * The callback invoked upon error/completion of a login request.
   */
  onLoginFinished: React.PropTypes.func.isRequired,

  /**
   * The callback invoked upon completion of a logout request.
   */
  onLogoutFinished: React.PropTypes.func.isRequired,
  
  /**
   * The callback invoked when login button is pressed. Return true
   * or false from this method to accept or cancel the login.
   */
  onWillLogin: React.PropTypes.func,

  /**
   * The behavior to use when attempting a login.
   */
  loginBehavior: React.PropTypes.oneOf([
    'native',
    'browser',
    'system-account',
    'web',
  ]),

  /**
   * The default audience to target when attempting a login.
   */
  defaultAudience: React.PropTypes.oneOf([
    'friends',
    'everyone',
    'only-me',
  ]),

  /**
   * The desired tooltip behavior.
   */
  tooltipBehavior: React.PropTypes.oneOf([
    'auto',
    'force-display',
    'disable',
  ]),
};

var styles = StyleSheet.create({
  /**
   * Default styling for the login button
   */
  fbsdkLoginButton: {
    width: 200,
    height: 50,
  },
});

var RCTFBSDKLoginButton = requireNativeComponent(
  'RCTFBSDKLoginButton',
  FBSDKLoginButton
);
module.exports = FBSDKLoginButton;
