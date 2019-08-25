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

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.share.Sharer;
import com.facebook.share.widget.ShareDialog;

@ReactModule(name = FBShareDialogModule.NAME)
public class FBShareDialogModule extends FBSDKCallbackManagerBaseJavaModule {

    public static final String NAME = "FBShareDialog";

    private class ShareDialogCallback extends ReactNativeFacebookSDKCallback<Sharer.Result> {

        public ShareDialogCallback(Promise promise) {
            super(promise);
        }

        @Override
        public void onSuccess(Sharer.Result result) {
            if (mPromise != null) {
                WritableMap shareResult = Arguments.createMap();
                shareResult.putString("postId", result.getPostId());
                mPromise.resolve(shareResult);
                mPromise = null;
            }
        }
    }

    private ShareDialog.Mode mShareDialogMode;
    private boolean mShouldFailOnError;

    public FBShareDialogModule(ReactApplicationContext reactContext, FBActivityEventListener activityEventListener) {
        super(reactContext, activityEventListener);
    }

    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void canShow(ReadableMap shareContent, Promise promise) {
        if (getCurrentActivity() != null) {
            ShareDialog shareDialog = new ShareDialog(getCurrentActivity());
            promise.resolve(
                mShareDialogMode == null
                ? shareDialog.canShow(Utility.buildShareContent(shareContent))
                : shareDialog.canShow(Utility.buildShareContent(shareContent), mShareDialogMode)
            );
        } else {
            promise.reject("No current activity.");
        }
    }

    @ReactMethod
    public void show(ReadableMap shareContent, final Promise promise) {
        if (getCurrentActivity() != null) {
            ShareDialog shareDialog = new ShareDialog(getCurrentActivity());
            shareDialog.registerCallback(getCallbackManager(), new ShareDialogCallback(promise));
            shareDialog.setShouldFailOnDataError(mShouldFailOnError);
            if (mShareDialogMode != null) {
                shareDialog.show(Utility.buildShareContent(shareContent), mShareDialogMode);
            } else {
                shareDialog.show(Utility.buildShareContent(shareContent));
            }
        } else {
            promise.reject("No current activity.");
        }
    }

    @ReactMethod
    public void setMode(String mode) {
        mShareDialogMode = ShareDialog.Mode.valueOf(mode.toUpperCase());
    }

    @ReactMethod
    public void setShouldFailOnError(boolean shouldFailOnError) {
        mShouldFailOnError = shouldFailOnError;
    }
}
