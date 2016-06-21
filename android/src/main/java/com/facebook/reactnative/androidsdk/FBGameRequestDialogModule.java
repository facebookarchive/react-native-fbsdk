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
import com.facebook.share.model.GameRequestContent;
import com.facebook.share.widget.GameRequestDialog;

/**
 * Provides functionality to send requests in games.
 * See https://developers.facebook.com/docs/games/requests
 */
public class FBGameRequestDialogModule extends FBSDKDialogBaseJavaModule {

    private class GameRequestDialogCallback extends ReactNativeFacebookSDKCallback<GameRequestDialog.Result> {

        public GameRequestDialogCallback(Promise promise) {
            super(promise);
        }

        @Override
        public void onSuccess(GameRequestDialog.Result result) {
            if (mPromise != null) {
                WritableMap gameRequestDialogResult = Arguments.createMap();
                gameRequestDialogResult.putString("requestId", result.getRequestId());
                gameRequestDialogResult.putArray("to", Utility.listToReactArray(result.getRequestRecipients()));
                mPromise.resolve(gameRequestDialogResult);
                mPromise = null;
            }
        }
    }

    public FBGameRequestDialogModule(ReactApplicationContext reactContext, CallbackManager callbackManager) {
        super(reactContext, callbackManager);
    }

    @Override
    public String getName() {
        return "FBGameRequestDialog";
    }

    /**
     * Indicates whether the game request dialog can be shown.
     * @param promise Use promise to pass the result to JS whether the dialog can be shown.
     */
    @ReactMethod
    public void canShow(Promise promise) {
        promise.resolve(GameRequestDialog.canShow());
    }

    /**
     * Shows a GameRequestDialog to send a request.
     * @param gameRequestContentMap must be a valid {@link GameRequestContent}.
     * @param promise Use promise to pass the game request dialog result to JS.
     */
    @ReactMethod
    public void show(ReadableMap gameRequestContentMap, Promise promise) {
        if (getCurrentActivity() != null) {
            GameRequestDialog gameRequestDialog = new GameRequestDialog(getCurrentActivity());
            GameRequestContent gameRequestContent = Utility.buildGameRequestContent(gameRequestContentMap);
            gameRequestDialog.registerCallback(getCallbackManager(), new GameRequestDialogCallback(promise));
            gameRequestDialog.show(gameRequestContent);
        } else {
            promise.reject("No current activity.");
        }
    }
}
