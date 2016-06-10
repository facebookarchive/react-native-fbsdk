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
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.share.model.AppInviteContent;
import com.facebook.share.widget.AppInviteDialog;

/**
 * A dialog for inviting users.
 */
public class FBAppInviteDialogModule extends FBSDKDialogBaseJavaModule {

    private class AppInviteDialogCallback extends ReactNativeFacebookSDKCallback<AppInviteDialog.Result> {

        public AppInviteDialogCallback(Promise promise) {
            super(promise);
        }

        @Override
        public void onSuccess(AppInviteDialog.Result result) {
            if (mPromise != null) {
                WritableMap inviteResult = Arguments.createMap();
                inviteResult.putMap("data", Arguments.fromBundle(result.getData()));
                mPromise.resolve(inviteResult);
                mPromise = null;
            }
        }
    }

    public FBAppInviteDialogModule(ReactApplicationContext reactContext, CallbackManager callbackManager) {
        super(reactContext, callbackManager);
    }

    @Override
    public String getName() {
        return "FBAppInviteDialog";
    }

    /**
     * Indicates whether the app invite dialog can be shown.
     * @param promise Use promise to pass result to JS.
     */
    @ReactMethod
    public void canShow(Promise promise) {
        promise.resolve(AppInviteDialog.canShow());
    }

    /**
     * Helper to show the provided {@link com.facebook.share.model.AppInviteContent}.
     * @param appInviteContentMap must be a valid {@link AppInviteContent}
     * @param promise Use promise to pass the app invite dialog result to JS.
     */
    @ReactMethod
    public void show(ReadableMap appInviteContentMap, Promise promise) {
        if (getCurrentActivity() != null) {
            AppInviteDialog appInviteDialog = new AppInviteDialog(getCurrentActivity());
            AppInviteContent appInviteContent = Utility.buildAppInviteContent(appInviteContentMap);
            appInviteDialog.registerCallback(getCallbackManager(), new AppInviteDialogCallback(promise));
            appInviteDialog.show(appInviteContent);
        } else {
            promise.reject("No current activity.");
        }
    }
}
