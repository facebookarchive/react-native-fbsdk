/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 * <p/>
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to use,
 * copy, modify, and distribute this software in source code or binary form for use
 * in connection with the web services and APIs provided by Facebook.
 * <p/>
 * As with any software that integrates with the Facebook platform, your use of
 * this software is subject to the Facebook Developer Principles and Policies
 * [http://developers.facebook.com/policy/]. This copyright notice shall be
 * included in all copies or substantial portions of the software.
 * <p/>
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

package com.facebook.reactnative.androidsdk;

import android.os.Bundle;

import com.facebook.AccessToken;
import com.facebook.FacebookRequestError;
import com.facebook.GraphRequest;
import com.facebook.GraphRequestBatch;
import com.facebook.GraphResponse;
import com.facebook.HttpMethod;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.WritableMap;

/**
 * FBGraphRequestModule holds a list of Request objects and send them to Facebook in a single
 * round-trip.
 */
public class FBGraphRequestModule extends ReactContextBaseJavaModule {

    private class GraphRequestBatchCallback implements GraphRequestBatch.Callback {

        private Callback mCallback;

        public GraphRequestBatchCallback(Callback callback) {
            mCallback = callback;
        }

        @Override
        public void onBatchCompleted(GraphRequestBatch batch) {
            if (mCallback != null) {
                mCallback.invoke(null, "success");
            }
            mGraphRequestBatch = null;
            mBatchCallback = null;
        }
    }

    private class GraphRequestCallback implements GraphRequest.Callback {

        private Callback mCallback;

        public GraphRequestCallback(Callback callback) {
            mCallback = callback;
        }

        @Override
        public void onCompleted(GraphResponse response) {
            if (mCallback != null) {
                mCallback.invoke(buildFacebookRequestError(response.getError()), response.getRawResponse());
            }
            mCallback = null;
        }
    }

    public FBGraphRequestModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "FBGraphRequest";
    }

    private GraphRequestBatch mGraphRequestBatch;
    private GraphRequestBatchCallback mBatchCallback;

    /**
     * Add a single {@link GraphRequest} to current batch.
     * @param graphRequestMap must contain a valid {@link GraphRequest} object.
     * @param callback Use Callback to pass result of the single request back to JS.
     */
    @ReactMethod
    public void addToConnection(ReadableMap graphRequestMap, Callback callback) {
        GraphRequest graphRequest = buildRequest(graphRequestMap, callback);
        if (mGraphRequestBatch == null) {
            mGraphRequestBatch = new GraphRequestBatch();
        }
        mGraphRequestBatch.add(graphRequest);
    }

    /**
     * Adds a batch-level callback which will be called when all requests in the batch have finished
     * executing.
     * @param callback Use Callback to pass result of the batch back to JS.
     */
    @ReactMethod
    public void addBatchCallback(Callback callback) {
        mBatchCallback = new GraphRequestBatchCallback(callback);
    }

    /**
     * Executes this batch asynchronously. This function will return immediately, and the batch will
     * be processed on a separate thread. In order to process results of a request, or determine
     * whether a request succeeded or failed, a callback must be specified when creating the request.
     * @param timeout Sets the timeout to wait for responses from the server before a timeout error occurs.
     *                The default input is 0, which means no timeout.
     */
    @ReactMethod
    public void start(int timeout) {
        if (mGraphRequestBatch != null) {
            mGraphRequestBatch.setTimeout(timeout);
            mGraphRequestBatch.addCallback(
                    mBatchCallback != null
                            ? mBatchCallback
                            : new GraphRequestBatchCallback(null));
            mGraphRequestBatch.executeAsync();
        }
    }

    private GraphRequest buildRequest(ReadableMap requestMap, Callback callback) {
        GraphRequest graphRequest = new GraphRequest();
        graphRequest.setGraphPath(requestMap.getString("graphPath"));
        setConfig(graphRequest, requestMap.getMap("config"));
        graphRequest.setCallback(new GraphRequestCallback(callback));
        return graphRequest;
    }

    private void setConfig(GraphRequest graphRequest, ReadableMap configMap) {
        if (configMap == null) {
            graphRequest.setAccessToken(AccessToken.getCurrentAccessToken());
            return;
        }
        if (configMap.hasKey("parameters")) {
            graphRequest.setParameters(buildParameters(configMap.getMap("parameters")));
        }
        if (configMap.hasKey("httpMethod")) {
            graphRequest.setHttpMethod(HttpMethod.valueOf(configMap.getString("httpMethod")));
        }
        if (configMap.hasKey("version")) {
            graphRequest.setVersion(configMap.getString("version"));
        }
        if (configMap.hasKey("accessToken")) {
            graphRequest.setAccessToken(new AccessToken(
                configMap.getString("accessToken"),
                AccessToken.getCurrentAccessToken().getApplicationId(),
                AccessToken.getCurrentAccessToken().getUserId(),
                null,
                null,
                null,
                null,
                null)
            );
        } else {
            graphRequest.setAccessToken(AccessToken.getCurrentAccessToken());
        }
    }

    private Bundle buildParameters(ReadableMap parameterMap) {
        Bundle parameters = new Bundle();
        ReadableMapKeySetIterator keyIterator = parameterMap.keySetIterator();
        while (keyIterator.hasNextKey()) {
            String key = keyIterator.nextKey();
            ReadableMap parameter = parameterMap.getMap(key);
            if (parameter.hasKey("string")) {
                parameters.putString(key, parameter.getString("string"));
            }
        }
        return parameters;
    }

    private ReadableMap buildFacebookRequestError(FacebookRequestError error) {
        if (error == null) {
            return null;
        }
        WritableMap errorMap = Arguments.createMap();
        errorMap.putInt("requestStatusCode", error.getRequestStatusCode());
        errorMap.putInt("errorCode", error.getErrorCode());
        errorMap.putInt("subErrorCode", error.getSubErrorCode());
        if (error.getErrorType() != null) {
            errorMap.putString("errorType", error.getErrorType());
        }
        if (error.getErrorMessage() != null) {
            errorMap.putString("errorMessage", error.getErrorMessage());
        }
        if (error.getErrorUserTitle() != null) {
            errorMap.putString("errorUserTitle", error.getErrorUserTitle());
        }
        if (error.getErrorUserMessage() != null) {
            errorMap.putString("errorUserMessage", error.getErrorUserMessage());
        }
        if (error.getRequestResultBody() != null) {
            errorMap.putString("requestResultBody", error.getRequestResultBody().toString());
        }
        if (error.getRequestResult() != null) {
            errorMap.putString("requestResult", error.getRequestResult().toString());
        }
        if (error.getBatchRequestResult() != null) {
            errorMap.putString("batchRequestResult", error.getBatchRequestResult().toString());
        }
        if (error.getException() != null) {
            errorMap.putString("exception", error.getException().toString());
        }
        return errorMap;
    }
}
