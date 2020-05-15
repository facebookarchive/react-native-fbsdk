/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
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

import * as React from 'react';
import {requireNativeComponent, StyleSheet} from 'react-native';

import type {
  DefaultAudience,
  LoginBehaviorAndroid,
  LoginBehaviorIOS,
  LoginResult,
} from './FBLoginManager';

type Event = Object;
type TooltipBehaviorIOS = 'auto' | 'force_display' | 'disable';

/**
 * A button that initiates a log in or log out flow upon tapping.
 */
class LoginButton extends React.Component<{
  /**
   * Represents the permissions to request when the login button
   * is pressed.
   */
  permissions?: Array<string>,

  /**
   * The callback invoked upon error/completion of a login request.
   */
  onLoginFinished?: (error: Object, result: LoginResult) => void,

  /**
   * The callback invoked upon completion of a logout request.
   */
  onLogoutFinished?: () => void,

  /**
   * The behavior to use when attempting a login.
   * @platform android
   */
  loginBehaviorAndroid?: LoginBehaviorAndroid,

  /**
   * The behavior to use when attempting a login.
   * @platform ios
   */
  loginBehaviorIOS?: LoginBehaviorIOS,

  /**
   * The default audience to target when attempting a login.
   */
  defaultAudience?: DefaultAudience,

  /**
   * For iOS only, the desired tooltip behavior.
   * @platform ios
   */
  tooltipBehaviorIOS?: TooltipBehaviorIOS,

  /**
   * View style, if any.
   */
  style?: any,
}> {
  static defaultProps: {
    style: typeof styles.defaultButtonStyle,
  };

  _eventHandler(event: Event) {
    const eventDict = event.nativeEvent;
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
    return (
      <RCTFBLoginButton
        {...this.props}
        onChange={this._eventHandler.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  defaultButtonStyle: {
    height: 30,
    width: 190,
  },
});

LoginButton.defaultProps = {
  style: styles.defaultButtonStyle,
};

const RCTFBLoginButton = requireNativeComponent('RCTFBLoginButton');

module.exports = LoginButton;
