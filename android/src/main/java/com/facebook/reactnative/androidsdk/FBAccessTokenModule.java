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

import com.facebook.AccessToken;
import com.facebook.AccessTokenTracker;
import com.facebook.FacebookException;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * This is a {@link NativeModule} that allows JS to use AcessToken in Facebook Android SDK.
 */
@ReactModule(name = FBAccessTokenModule.NAME)
public class FBAccessTokenModule extends ReactContextBaseJavaModule {

    public static final String NAME = "FBAccessToken";
    public static final String CHANGE_EVENT_NAME = "fbsdk.accessTokenDidChange";

    private final ReactApplicationContext mReactContext;
    private AccessTokenTracker accessTokenTracker;

    public FBAccessTokenModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    public String getName() {
        return NAME;
    }

    @Override
    public void initialize() {
        super.initialize();
        accessTokenTracker = new AccessTokenTracker() {
            @Override
            protected void onCurrentAccessTokenChanged(AccessToken oldAccessToken, AccessToken currentAccessToken) {
                mReactContext
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit(CHANGE_EVENT_NAME, currentAccessToken == null ? null : Utility.accessTokenToReactMap(currentAccessToken));
            }
        };

    }

    @Override
    public void onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy();
        accessTokenTracker.stopTracking();
    }

    /**
     * Get {@link AccessToken} of the current session.
     * @param callback Use callback to pass the current access token back to JS.
     */
    @ReactMethod
    public void getCurrentAccessToken(Callback callback) {
        //Return the accessToken object as a ReactMap.
        callback.invoke(AccessToken.getCurrentAccessToken() == null
                ? null
                : Utility.accessTokenToReactMap(AccessToken.getCurrentAccessToken()));
    }

    /**
     * Set {@link AccessToken} for the current session.
     * @param accessTokenMap must satisfy the requirements in
     *                       <a href="https://developers.facebook.com/docs/reference/android/current/class/AccessToken/">
     *                       Facebook AccessToken</a>
     */
    @ReactMethod
    public void setCurrentAccessToken(ReadableMap accessTokenMap) {
        AccessToken accessToken = Utility.buildAccessToken(accessTokenMap);
        AccessToken.setCurrentAccessToken(accessToken);
    }

    /**
     * Updates the current access token with up to date permissions, and extends the expiration
     * date, if extension is possible.
     * @param promise use promise to pass result back to JS.
     */
    @ReactMethod
    public void refreshCurrentAccessTokenAsync(final Promise promise) {
        AccessToken.refreshCurrentAccessTokenAsync(new AccessToken.AccessTokenRefreshCallback() {
            @Override
            public void OnTokenRefreshed(AccessToken accessToken) {
                promise.resolve(Utility.accessTokenToReactMap(accessToken));
            }

            @Override
            public void OnTokenRefreshFailed(FacebookException exception) {
                promise.reject(exception);
            }
        });
    }
}
