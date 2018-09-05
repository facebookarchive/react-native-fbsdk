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

import android.util.Log;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.share.model.ShareContent;
import com.facebook.share.widget.ShareButton;

public class FBShareButtonManager extends SimpleViewManager<ShareButton> {

    public static final String REACT_CLASS = "RCTFBShareButton";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected ShareButton createViewInstance(ThemedReactContext reactContext) {
        return new ShareButton(reactContext);
    }

    @ReactProp(name = "shareContent")
    public void setShareContent(ShareButton shareButton, ReadableMap shareContentMap) {
        ShareContent shareContent = Utility.buildShareContent(shareContentMap);
        if (shareContent != null) {
            shareButton.setShareContent(shareContent);
        }
    }
}
