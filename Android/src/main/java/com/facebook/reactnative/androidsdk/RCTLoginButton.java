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

import com.facebook.AccessToken;
import com.facebook.AccessTokenTracker;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.login.LoginResult;
import com.facebook.login.widget.LoginButton;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.Set;

/**
 * A Log In/Log Out button that maintains login state and logs in/out for the app.
 * This control requires the app ID to be specified in the AndroidManifest.xml.
 */
public class RCTLoginButton extends LoginButton implements ActivityEventListener {

    private CallbackManager mCallbackManager;
    private AccessTokenTracker mAccessTokenTracker;

    public RCTLoginButton(ThemedReactContext context, CallbackManager callbackManager) {
        super(context);
        this.setToolTipMode(ToolTipMode.NEVER_DISPLAY);
        mCallbackManager = callbackManager;
        init();
    }

    public void init() {
        mAccessTokenTracker = new AccessTokenTracker() {
            @Override
            protected void onCurrentAccessTokenChanged(
                    AccessToken oldAccessToken,
                    AccessToken currentAccessToken) {
                if (currentAccessToken == null) {
                    WritableMap event = Arguments.createMap();
                    event.putString("type", "logoutFinished");
                    ReactContext context = (ReactContext) getContext();
                    context.getJSModule(RCTEventEmitter.class).receiveEvent(
                            getId(),
                            "topChange",
                            event);
                }
            }
        };
        this.registerCallback(mCallbackManager, new FacebookCallback<LoginResult>() {
            @Override
            public void onSuccess(LoginResult loginResult) {
                WritableMap event = Arguments.createMap();
                event.putString("type", "loginFinished");
                event.putString("error", null);
                WritableMap result = Arguments.createMap();
                result.putBoolean("isCancelled", false);
                result.putArray(
                        "grantedPermissions",
                        Arguments.fromJavaArgs(
                                setToStringArray(loginResult.getRecentlyGrantedPermissions())));
                result.putArray(
                        "declinedPermissions",
                        Arguments.fromJavaArgs(
                                setToStringArray(loginResult.getRecentlyDeniedPermissions())));
                event.putMap("result", result);
                ReactContext context = (ReactContext) getContext();
                context.getJSModule(RCTEventEmitter.class).receiveEvent(
                        getId(),
                        "topChange",
                        event);
            }

            @Override
            public void onError(FacebookException error) {
                WritableMap event = Arguments.createMap();
                event.putString("type", "loginFinished");
                event.putString("error", error.toString());
                WritableMap result = Arguments.createMap();
                result.putBoolean("isCancelled", false);
                event.putMap("result", result);
                ReactContext context = (ReactContext) getContext();
                context.getJSModule(RCTEventEmitter.class).receiveEvent(
                        getId(),
                        "topChange",
                        event);
            }

            @Override
            public void onCancel() {
                WritableMap event = Arguments.createMap();
                event.putString("type", "loginFinished");
                event.putString("error", null);
                WritableMap result = Arguments.createMap();
                result.putBoolean("isCancelled", true);
                event.putMap("result", result);
                ReactContext context = (ReactContext) getContext();
                context.getJSModule(RCTEventEmitter.class).receiveEvent(
                        getId(),
                        "topChange",
                        event);
            }
        });
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        mCallbackManager.onActivityResult(requestCode, resultCode, data);
    }

    private String[] setToStringArray(Set<String> set) {
        String[] array = new String[set.size()];
        int i = 0;
        for (String e : set) {
            array[i++] = e;
        }
        return array;
    }
}
