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
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.share.ShareApi;
import com.facebook.share.Sharer;
import com.facebook.share.model.ShareContent;

/**
 * Provides an interface for sharing through the graph API. Using this class requires an access
 * token in AccessToken.currentAccessToken that has been granted the "publish_actions" permission.
 */
@ReactModule(name = FBShareAPIModule.NAME)
public class FBShareAPIModule extends ReactContextBaseJavaModule {

    public static final String NAME = "FBShareApi";

    private class ShareAPICallback extends ReactNativeFacebookSDKCallback<Sharer.Result> {

        public ShareAPICallback(Promise promise) {
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

    public FBShareAPIModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return NAME;
    }

    /**
     * Share the content.
     * @param shareContentMap must be a valid {@link ShareContent}.
     * @param graphNode The graph node to share to (this can be a user id, event id, page id, group id, album
     * id, etc).
     * @param message The custom message that will accompany the share content.
     * @param promise Use promise to pass share api result to JS.
     */
    @ReactMethod
    public void share(ReadableMap shareContentMap, String graphNode, String message, Promise promise) {
        ShareContent shareContent = Utility.buildShareContent(shareContentMap);
        if(shareContent != null) {
            ShareApi shareApi = new ShareApi(shareContent);
            shareApi.setGraphNode(graphNode);
            shareApi.setMessage(message);
            shareApi.share(new ShareAPICallback(promise));
        } else {
            promise.reject("ShareContent cannot be null");
        }
    }

    /**
     * Check if the content can be shared.
     * @param shareContentMap must be a valid {@link ShareContent}
     * @param promise Use promise to pass the result to JS.
     */
    @ReactMethod
    public void canShare(ReadableMap shareContentMap, Promise promise) {
        ShareContent shareContent = Utility.buildShareContent(shareContentMap);
        if(shareContent != null) {
            ShareApi shareApi = new ShareApi(shareContent);
            promise.resolve(shareApi.canShare());
        } else {
            promise.reject("ShareContent cannot be null");
        }
    }
}
