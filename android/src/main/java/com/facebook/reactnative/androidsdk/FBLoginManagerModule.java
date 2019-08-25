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

import android.app.Activity;

import com.facebook.AccessToken;
import com.facebook.login.DefaultAudience;
import com.facebook.login.LoginBehavior;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;

import java.util.Set;

/**
 * This is a {@link NativeModule} that allows JS to use LoginManager of Facebook Android SDK.
 */
@ReactModule(name = FBLoginManagerModule.NAME)
public class FBLoginManagerModule extends FBSDKCallbackManagerBaseJavaModule {

    public static final String NAME = "FBLoginManager";

    private class LoginManagerCallback extends ReactNativeFacebookSDKCallback<LoginResult> {

        public LoginManagerCallback(Promise promise) {
            super(promise);
        }

        @Override
        public void onSuccess(LoginResult loginResult) {
            if (mPromise != null) {
                AccessToken accessToken = loginResult.getAccessToken();
                AccessToken.setCurrentAccessToken(accessToken);
                WritableMap result = Arguments.createMap();
                result.putBoolean("isCancelled", false);
                result.putArray("grantedPermissions",
                        setToWritableArray(loginResult.getRecentlyGrantedPermissions()));
                result.putArray("declinedPermissions",
                        setToWritableArray(loginResult.getRecentlyDeniedPermissions()));
                mPromise.resolve(result);
                mPromise = null;
            }
        }
    }

    public FBLoginManagerModule(ReactApplicationContext reactContext, FBActivityEventListener activityEventListener) {
        super(reactContext, activityEventListener);
    }

    @Override
    public String getName() {
        return NAME;
    }

    /**
     * Get {@link LoginBehavior} for login attempts.
     * @param promise Use Promise to pass login behavior back to JS.
     */
    @ReactMethod
    public void getLoginBehavior(Promise promise) {
        promise.resolve(LoginManager.getInstance().getLoginBehavior().name().toLowerCase());
    }

    /**
     * Set {@link LoginBehavior} for login attempts.
     * @param loginBehaviorString must be one of the constants in Enum
     * {@link LoginBehavior}.
     * @throws {@link java.lang.IllegalArgumentException} if the argument is not a valid constant.
     */
    @ReactMethod
    public void setLoginBehavior(String loginBehaviorString) {
        LoginBehavior loginBehavior = LoginBehavior.valueOf(loginBehaviorString.toUpperCase());
        LoginManager.getInstance().setLoginBehavior(loginBehavior);
    }

    /**
     * Get {@link DefaultAudience} to use for sessions that post data to Facebook.
     * @param promise Use promise to pass default audience back to JS.
     */
    @ReactMethod
    public void getDefaultAudience(Promise promise) {
        promise.resolve(LoginManager.getInstance().getDefaultAudience().name().toLowerCase());
    }

    /**
     * Set {@link DefaultAudience} to use for sessions that post data to Facebook.
     * @param defaultAudienceString must be one of the constants in Enum {@link DefaultAudience}.
     * @throws {@link java.lang.IllegalArgumentException} if the argument is not a valid constant.
     */
    @ReactMethod
    public void setDefaultAudience(String defaultAudienceString) {
        DefaultAudience defaultAudience = DefaultAudience.valueOf(defaultAudienceString.toUpperCase());
        LoginManager.getInstance().setDefaultAudience(defaultAudience);
    }

    /**
     * Log out from Facebook.
     */
    @ReactMethod
    public void logOut() {
        LoginManager.getInstance().logOut();
    }

    /**
     * Attempts a Facebook login with the specified permissions.
     * @param permissions must be one of the provided permissions. See
     *                    <a href="https://developers.facebook.com/docs/facebook-login/permissions">
     *                    Facebook login permissions</a>.
     * @param promise Use promise to pass login result to JS after login finish.
     */
    @ReactMethod
    public void logInWithPermissions(ReadableArray permissions, final Promise promise) {
        final LoginManager loginManager = LoginManager.getInstance();
        loginManager.registerCallback(getCallbackManager(), new LoginManagerCallback(promise));
        Activity activity = getCurrentActivity();
        if (activity != null) {
            loginManager.logIn(activity,
                    Utility.reactArrayToStringList(permissions));
        }
    }

    private WritableArray setToWritableArray(Set<String> set) {
        WritableArray array = Arguments.createArray();
        for (String e: set) {
            array.pushString(e);
        }
        return array;
    }
}
