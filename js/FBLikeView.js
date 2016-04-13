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
 */
'use strict';

import React, {
  PropTypes,
  requireNativeComponent,
  StyleSheet,
  View,
} from 'react-native';

import type { ObjectIdAndType } from './models/FBObjectIdAndType';
type LikeViewStyle = 'button'|  //Note 'button' is only available on Android.
                     'standard' |
                     'box_count';

type AuxiliaryViewPosition = 'top' | 'bottom' | 'inline';
type HorizontalAlignment = 'center' | 'left' | 'right';

/**
 * UI control to like an object in the Facebook graph.
 */
class LikeView extends React.Component {
  static defaultProps: {
   style: typeof styles.defaultButtonStyle;
  };

  props: {
    /**
     * The objectId and type for the object to like.
     */
    objectIdAndType: ObjectIdAndType;

    /**
     * The style to use for the receiver.  Distinct from React styling.
     */
    likeViewStyle?: LikeViewStyle;

    /**
     * The position for the auxiliary view for the receiver.
     */
    auxiliaryViewPosition?: AuxiliaryViewPosition;

    /**
     * The text alignment of the social sentence.
     */
    horizontalAlignment?: HorizontalAlignment;

    /**
     * The foreground color to use for the content of the receiver.
     */
    foregroundColor?: number;

    /**
     * If true, a sound is played when the receiver is toggled.
     */
    soundEnabled?: bool;

    /**
     * View style, if any.
     */
    style?: any;
  };

  render() {
   return (
     <RCTFBLikeView
       {...this.props}
     />
   );
  }
}

LikeView.propTypes = {
  ...View.propTypes,
  objectIdAndType: PropTypes.object.isRequired,
  likeViewStyle: PropTypes.oneOf(['standard', 'button', 'box_count']),
  auxiliaryViewPosition: PropTypes.oneOf(['top', 'bottom', 'inline']),
  horizontalAlignment: PropTypes.oneOf(['center', 'left', 'right']),
  foregroundColor: PropTypes.number,
  soundEnabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  defaultButtonStyle: {
   height: 65,
   width: 300,
  },
});

LikeView.defaultProps = { style: styles.defaultButtonStyle };

const RCTFBLikeView = requireNativeComponent(
  'RCTFBLikeView',
  LikeView
);

module.exports = LikeView;
