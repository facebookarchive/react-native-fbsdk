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
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {LoginButton, LoginManager, ShareDialog} from 'react-native-fbsdk';

const SHARE_LINK_CONTENT = {
  contentType: 'link',
  contentUrl: 'https://www.facebook.com/',
};

export default class App extends Component<{}> {
  _alert = (title, obj) => {
    Alert.alert(title, JSON.stringify(obj, null, 2));
  };

  _reauthorizeDataAccess = async () => {
    try {
      const result = await LoginManager.reauthorizeDataAccess();
      this._alert("Result", result);
    } catch (error) {
      this._alert("Error", error);
    }
  };

  _shareLinkWithShareDialog = async () => {
    const canShow = await ShareDialog.canShow(SHARE_LINK_CONTENT);
    if (canShow) {
      try {
        const {isCancelled, postId} = await ShareDialog.show(
          SHARE_LINK_CONTENT,
        );
        if (isCancelled) {
          Alert.alert('Share cancelled');
        } else {
          Alert.alert('Share success with postId: ' + postId);
        }
      } catch (error) {
        Alert.alert('Share fail with error: ' + error);
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <LoginButton
          onLoginFinished={(error, data) => {
            Alert.alert(JSON.stringify(error || data, null, 2));
          }}
        />
        <TouchableHighlight onPress={this._reauthorizeDataAccess}>
          <Text style={styles.buttonText}>Reauthorize Data Access</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._shareLinkWithShareDialog}>
          <Text style={styles.buttonText}>Share link with ShareDialog</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonText: {
    fontSize: 20,
    margin: 10,
  },
});
