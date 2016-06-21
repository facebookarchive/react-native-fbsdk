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
import com.facebook.share.model.AppGroupCreationContent;
import com.facebook.share.widget.CreateAppGroupDialog;

/**
 * A dialog for creating app groups.
 */
public class FBCreateAppGroupDialogModule extends FBSDKDialogBaseJavaModule {

    private class CreateAppGroupDialogCallback extends ReactNativeFacebookSDKCallback<CreateAppGroupDialog.Result> {

        public CreateAppGroupDialogCallback(Promise promise) {
            super(promise);
        }

        @Override
        public void onSuccess(CreateAppGroupDialog.Result result) {
            if (mPromise != null) {
                WritableMap createAppGroupDialogResult = Arguments.createMap();
                createAppGroupDialogResult.putString("groupId", result.getId());
                mPromise.resolve(createAppGroupDialogResult);
                mPromise = null;
            }
        }
    }

    public FBCreateAppGroupDialogModule(ReactApplicationContext reactContext, CallbackManager callbackManager) {
        super(reactContext, callbackManager);
    }

    @Override
    public String getName() {
        return "FBCreateAppGroupDialog";
    }


    /**
     * Indicates whether the create app group dialog can be shown.
     *  @param promise Use promise to pass result to JS.
     */
    @ReactMethod
    public void canShow(Promise promise) {
        promise.resolve(CreateAppGroupDialog.canShow());
    }

    /**
     * Shows an {@link CreateAppGroupDialog} to create a group with the passed in content, using
     * the passed in activity. No callback will be invoked.
     * @param appGroupCreationContentMap Content describing the group to be created.
     * @param promise Use promise to pass create app group dialog result to JS.
     */
    @ReactMethod
    public void show(ReadableMap appGroupCreationContentMap, Promise promise) {
        AppGroupCreationContent appGroupCreationContent = Utility.buildAppGroupCreationContent(appGroupCreationContentMap);
        if (getCurrentActivity() != null) {
            CreateAppGroupDialog createAppGroupDialog = new CreateAppGroupDialog(getCurrentActivity());
            createAppGroupDialog.registerCallback(getCallbackManager(), new CreateAppGroupDialogCallback(promise));
            createAppGroupDialog.show(appGroupCreationContent);
        } else {
            promise.reject("No current activity.");
        }
    }
}
