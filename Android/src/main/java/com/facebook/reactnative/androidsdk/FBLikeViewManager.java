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
 */

package com.facebook.reactnative.androidsdk;

import android.content.Intent;
import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.share.widget.LikeView;


public class FBLikeViewManager extends SimpleViewManager<RCTLikeView> {

    public static final String REACT_CLASS = "RCTFBLikeView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public RCTLikeView createViewInstance(ThemedReactContext context) {
        RCTLikeView button = new RCTLikeView(context);
        return button;
    }

    @ReactProp(name = "objectIdAndType")
    public void setObjectIdAndType(RCTLikeView likeView, @Nullable ReadableMap objectIdAndType) {
        if (objectIdAndType.hasKey("objectId") && objectIdAndType.hasKey("objectType")) {
            likeView.setObjectIdAndType(
                    objectIdAndType.getString("objectId"),
                    LikeView.ObjectType.valueOf(objectIdAndType.getString("objectType").toUpperCase()));
        }
    }

    @ReactProp(name = "likeViewStyle")
    public void setLikeViewStyle(RCTLikeView likeView, @Nullable String likeViewStyle) {
        likeView.setLikeViewStyle(LikeView.Style.valueOf(likeViewStyle.toUpperCase()));
    }

    @ReactProp(name = "auxiliaryViewPosition")
    public void setAuxiliaryViewPosition(RCTLikeView likeView, @Nullable String auxiliaryViewPosition) {
        likeView.setAuxiliaryViewPosition(LikeView.AuxiliaryViewPosition.valueOf(auxiliaryViewPosition.toUpperCase()));
    }

    @ReactProp(name = "horizontalAlignment")
    public void setHorizontalAlignment(RCTLikeView likeView, @Nullable String horizontalAlignment) {
        likeView.setHorizontalAlignment(LikeView.HorizontalAlignment.valueOf(horizontalAlignment.toUpperCase()));
    }

    @ReactProp(name = "foregroundColor")
    public void setForegroundColor(RCTLikeView likeView, int foregroundColor) {
        likeView.setForegroundColor(foregroundColor);
    }

    @ReactProp(name = "soundEnabled")
    public void setSoundEnabled(RCTLikeView likeView, boolean soundEnabled) {
        likeView.setSoundEffectsEnabled(soundEnabled);
    }
}
