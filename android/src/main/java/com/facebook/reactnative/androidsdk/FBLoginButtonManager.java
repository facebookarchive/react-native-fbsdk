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

import androidx.annotation.Nullable;

import com.facebook.login.DefaultAudience;
import com.facebook.login.LoginBehavior;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;


public class FBLoginButtonManager extends SimpleViewManager<RCTLoginButton> {

    public static final String REACT_CLASS = "RCTFBLoginButton";

    private FBActivityEventListener mActivityEventListener = new FBActivityEventListener();

    public FBLoginButtonManager(ReactApplicationContext reactApplicationContext) {
        reactApplicationContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public RCTLoginButton createViewInstance(ThemedReactContext context) {
        return new RCTLoginButton(context, mActivityEventListener.getCallbackManager());

    }

    @ReactProp(name = "loginBehaviorAndroid")
    public void setLoginBehavior(RCTLoginButton loginButton, @Nullable String loginBehavior) {
        loginButton.setLoginBehavior(LoginBehavior.valueOf(loginBehavior.toUpperCase()));
    }

    @ReactProp(name = "defaultAudience")
    public void setDefaultAudience(RCTLoginButton loginButton, @Nullable String defaultAudience) {
        loginButton.setDefaultAudience(DefaultAudience.valueOf(defaultAudience.toUpperCase()));
    }

    @ReactProp(name = "permissions")
    public void setPermissions(
            RCTLoginButton loginButton,
            @Nullable ReadableArray publishPermissions) {
        loginButton.setPermissions(Utility.reactArrayToStringList(publishPermissions));
    }
}
