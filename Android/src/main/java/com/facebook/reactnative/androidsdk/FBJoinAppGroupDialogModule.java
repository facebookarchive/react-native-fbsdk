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
import com.facebook.FacebookException;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.share.widget.JoinAppGroupDialog;

/**
 * A dialog for joining app groups
 */
public class FBJoinAppGroupDialogModule extends FBSDKDialogBaseJavaModule {

    private class JoinAppGroupDialogCallback extends ReactNativeFacebookSDKCallback<JoinAppGroupDialog.Result> {

        public JoinAppGroupDialogCallback(Promise promise) {
            super(promise);
        }

        @Override
        public void onSuccess(JoinAppGroupDialog.Result result) {
            if (mPromise != null) {
                WritableMap joinAppGroupDialogResult = Arguments.createMap();
                joinAppGroupDialogResult.putMap("data", Arguments.fromBundle(result.getData()));
                mPromise.resolve(joinAppGroupDialogResult);
                mPromise = null;
            }
        }
    }

    public FBJoinAppGroupDialogModule(ReactApplicationContext reactContext, CallbackManager callbackManager) {
        super(reactContext, callbackManager);
    }

    @Override
    public String getName() {
        return "FBJoinAppGroupDialog";
    }

    /**
     * Indicates whether the join app group dialog can be shown.
     * @param promise Use promise to pass the result to JS whether the dialog can be shown.
     */
    @ReactMethod
    public void canShow(Promise promise) {
        promise.resolve(JoinAppGroupDialog.canShow());
    }

    /**
     * Shows an {@link JoinAppGroupDialog} to join a group with the passed in Id.
     * @param groupId Id of the group to join
     * @param promise Use promise to pass the join app group dialog result to JS.
     */
    @ReactMethod
    public void show(String groupId, Promise promise) {
        if (getCurrentActivity() != null) {
            JoinAppGroupDialog joinAppGroupDialog = new JoinAppGroupDialog(getCurrentActivity());
            joinAppGroupDialog.registerCallback(getCallbackManager(), new JoinAppGroupDialogCallback(promise));
            joinAppGroupDialog.show(groupId);
        } else {
            promise.reject("No current activity.");
        }
    }
}
