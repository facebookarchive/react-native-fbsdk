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
 * UI View to display a Facebook ad.
 */
class FBAdView extends React.Component {
  _eventHandler(event: Object) {
    var eventDict = event.nativeEvent;
    if (eventDict.type === 'adViewLoadFail') {
      if (this.props.onAdLoadFailed) {
        this.props.onAdLoadFailed(eventDict.error);
      }
    } else if (eventDict.type === 'adViewLoadSuccess') {
      if (this.props.onAdLoadSuccess) {
        this.props.onAdLoadSuccess();
      }
    } else if (eventDict.type === 'adViewClick') {
      if (this.props.onAdClick) {
        this.props.onAdClick();
      }
    } else if (eventDict.type === 'adViewFinishClick') {
      if (this.props.onAdFinishClick) {
        this.props.onAdFinishClick();
      }
    }
  }

  render() {
    return (
      <RCTFBAdView
        {...this.props}
        style={this.props.style || styles.fbAdViewDefault}
        onChange={this._eventHandler.bind(this)}
      />
    );
  }
}

FBAdView.propTypes = {
  /**
   * The placementID for the ad.
   */
  placementID: React.PropTypes.string.isRequired,

  /**
   * The adSize for the ad.
   */
  adSize: React.PropTypes.string.isRequired,

  /**
   * The callback invoked upon error of an ad request.
   * Expects a function of the form (error: Object) => void
   */
  onAdLoadFailed: React.PropTypes.func,

  /**
   * The callback invoked upon completion of an ad request.
   * Expects a function of the form () => void
   */
  onAdLoadSuccess: React.PropTypes.func,

  /**
   * The callback invoked upon click of an ad request.
   * Expects a function of the form () => void
   */
  onAdClick: React.PropTypes.func,

  /**
   * The callback invoken upon the user finishing the click of an ad.
   * Expects a function of the form () => void
   */
  onAdFinishClick: React.PropTypes.func,
};

var styles = StyleSheet.create({
  /**
   * Default styling for the ad
   */
  fbAdViewDefault: {
    width: 500,
    height: 500,
  },
});

var RCTFBAdView = requireNativeComponent(
  'RCTFBAdView',
  FBAdView
);

module.exports = FBAdView;
