/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 * <p/>
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to use,
 * copy, modify, and distribute this software in source code or binary form for use
 * in connection with the web services and APIs provided by Facebook.
 * <p/>
 * As with any software that integrates with the Facebook platform, your use of
 * this software is subject to the Facebook Developer Principles and Policies
 * [http://developers.facebook.com/policy/]. This copyright notice shall be
 * included in all copies or substantial portions of the software.
 * <p/>
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

package com.facebook.reactnative.androidsdk;

import com.facebook.applinks.AppLinkData;
import com.facebook.internal.Utility;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import org.json.JSONObject;

/**
 * FBAppLinkModule
 */
@ReactModule(name = FBAppLinkModule.NAME)
public class FBAppLinkModule extends ReactContextBaseJavaModule {
    public static final String NAME = "FBAppLink";

    private final ReactApplicationContext mReactContext;

    public FBAppLinkModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    @Override
    public String getName() {
        return NAME;
    }

    /**
     * The completion handler of fetchDeferredAppLinkData.
     *
     * @param promise If AppLinkData is found, resolve app link url, otherwise resolve null.
     */
    private AppLinkData.CompletionHandler createCompletionHandler(final Promise promise) {
        return new AppLinkData.CompletionHandler() {
            @Override
            public void onDeferredAppLinkDataFetched(AppLinkData appLinkData) {
                if (appLinkData == null) {
                    promise.resolve(null);
                } else {
                    promise.resolve(appLinkData.getTargetUri().toString());
                }
            }
        };
    }

    /**
     * Asynchronously fetches app link information that might have been stored for use after
     * installation of the app.
     *
     * @param promise Used to pass app link to JS on fetch completed using completion handler.
     */
    @ReactMethod
    public void fetchDeferredAppLink(final Promise promise) {
        try {
            AppLinkData.fetchDeferredAppLinkData(mReactContext.getApplicationContext(),
                    createCompletionHandler(promise));
        } catch (Exception e) {
            promise.resolve(null);
            Utility.logd(getName(), "Received error while fetching deferred app link", e);
        }
    }
}
