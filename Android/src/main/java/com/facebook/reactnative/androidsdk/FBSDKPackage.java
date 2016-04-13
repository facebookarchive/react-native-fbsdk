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

import com.facebook.CallbackManager;
import com.facebook.internal.InternalSettings;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class FBSDKPackage implements ReactPackage {

    public static String VERSION_TO_RELEASE = "ReactNative-v0.1.0";

    private CallbackManager mCallbackManager;
    public FBSDKPackage(CallbackManager callbackManager) {
        mCallbackManager = callbackManager;
    }

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        InternalSettings.setCustomUserAgent(VERSION_TO_RELEASE);
        return Arrays.<NativeModule>asList(
                new FBAccessTokenModule(reactContext),
                new FBAppEventsLoggerModule(reactContext),
                new FBAppInviteDialogModule(reactContext, mCallbackManager),
                new FBCreateAppGroupDialogModule(reactContext, mCallbackManager),
                new FBGameRequestDialogModule(reactContext, mCallbackManager),
                new FBGraphRequestModule(reactContext),
                new FBJoinAppGroupDialogModule(reactContext, mCallbackManager),
                new FBLoginManagerModule(reactContext, mCallbackManager),
                new FBMessageDialogModule(reactContext, mCallbackManager),
                new FBShareAPIModule(reactContext),
                new FBShareDialogModule(reactContext, mCallbackManager)
        );
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(
                new FBLikeViewManager(),
                new FBLoginButtonManager(reactContext, mCallbackManager),
                new FBSendButtonManager(),
                new FBShareButtonManager()
        );
    }
}
