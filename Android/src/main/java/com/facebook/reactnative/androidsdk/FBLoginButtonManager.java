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

import android.support.annotation.Nullable;

import com.facebook.CallbackManager;
import com.facebook.login.DefaultAudience;
import com.facebook.login.LoginBehavior;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

import java.util.ArrayList;
import java.util.List;

public class FBLoginButtonManager extends SimpleViewManager<RCTLoginButton> {

    public static final String REACT_CLASS = "RCTFBLoginButton";

    private ReactApplicationContext mReactApplicationContext;
    private CallbackManager mCallbackManager;

    public FBLoginButtonManager(ReactApplicationContext reactApplicationContext, CallbackManager callbackManager) {
        mReactApplicationContext = reactApplicationContext;
        mCallbackManager = callbackManager;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public RCTLoginButton createViewInstance(ThemedReactContext context) {
        RCTLoginButton button = new RCTLoginButton(context, mCallbackManager);
        mReactApplicationContext.addActivityEventListener(button);
        return button;

    }

    @ReactProp(name = "loginBehaviorAndroid")
    public void setLoginBehavior(RCTLoginButton loginButton, @Nullable String loginBehavior) {
        loginButton.setLoginBehavior(LoginBehavior.valueOf(loginBehavior.toUpperCase()));
    }

    @ReactProp(name = "defaultAudience")
    public void setDefaultAudience(RCTLoginButton loginButton, @Nullable String defaultAudience) {
        loginButton.setDefaultAudience(DefaultAudience.valueOf(defaultAudience.toUpperCase()));
    }

    @ReactProp(name = "publishPermissions")
    public void setPublishPermissions(
            RCTLoginButton loginButton,
            @Nullable ReadableArray publishPermissions) {
        loginButton.setPublishPermissions(reactArrayToJavaStringCollection(publishPermissions));
    }

    @ReactProp(name = "readPermissions")
    public void setReadPermissions(
            RCTLoginButton loginButton,
            @Nullable ReadableArray readPermissions){
        loginButton.setReadPermissions(reactArrayToJavaStringCollection(readPermissions));
    }

    private static List<String> reactArrayToJavaStringCollection(ReadableArray array) {
        List<String> list = new ArrayList<>();
        for (int i = 0; i < array.size(); i++) {
            list.add(array.getString(i));
        }
        return list;
    }
}
