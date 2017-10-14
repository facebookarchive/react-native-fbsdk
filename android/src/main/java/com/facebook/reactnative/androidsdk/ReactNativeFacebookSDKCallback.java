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

import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;

/**
 * A callback class fulfilled by Promise for the React Native Facebook SDK.
 * @param <RESULT>
 */
public abstract class ReactNativeFacebookSDKCallback <RESULT> implements FacebookCallback<RESULT> {

    Promise mPromise;

    public ReactNativeFacebookSDKCallback(Promise promise) {
        mPromise = promise;
    }

    @Override
    public void onCancel() {
        if (mPromise != null) {
            WritableMap result = Arguments.createMap();
            result.putBoolean("isCancelled", true);
            mPromise.resolve(result);
            mPromise = null;
        }
    }

    @Override
    public void onError(FacebookException error) {
        if (mPromise != null) {
            mPromise.reject(error);
            mPromise = null;
        }
    }
}
