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
import android.util.SparseArray;

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
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Iterator;

/**
 * FBGraphRequestModule holds a list of request objects and send them to Facebook in a single
 * round-trip.
 */
public class FBGraphRequestModule extends ReactContextBaseJavaModule {
    private SparseArray<WritableMap> mResponses;

    private class GraphRequestBatchCallback implements GraphRequestBatch.Callback {

        private int mBatchID;
        private Callback mCallback;

        public GraphRequestBatchCallback(int batchID, Callback callback) {
            mBatchID = batchID;
            mCallback = callback;
        }

        @Override
        public void onBatchCompleted(GraphRequestBatch batch) {
            WritableMap result = Arguments.createMap();
            result.putString("result", "batch finished executing or timed out");
            mCallback.invoke(null, result, mResponses.get(mBatchID));
            mResponses.remove(mBatchID);
        }
    }

    private class GraphRequestCallback implements GraphRequest.Callback {

        private String mIndex;
        private int mBatchID;

        public GraphRequestCallback(int index, int batchID) {
            mIndex = String.valueOf(index);
            mBatchID = batchID;
        }

        @Override
        public void onCompleted(GraphResponse response) {
            WritableArray responseArray = Arguments.createArray();
            responseArray.pushMap(buildFacebookRequestError(response.getError()));
            responseArray.pushMap(buildGraphResponse(response));
            mResponses.get(mBatchID).putArray(mIndex, responseArray);
        }
    }

    public FBGraphRequestModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mResponses = new SparseArray<WritableMap>();
    }

    @Override
    public String getName() {
        return "FBGraphRequest";
    }

    /**
     * Send the batch of requests.
     * @param requestBatch
     * @param timeout
     * @param batchCallback
     */
    @ReactMethod
    public void start(ReadableArray requestBatch, int timeout, Callback batchCallback) {
        GraphRequestBatch batch = new GraphRequestBatch();
        int potentialID = 0;
        int batchID = 0;
        synchronized (this) {
            do {
                batchID = potentialID++;
            } while (mResponses.get(batchID) != null);
            mResponses.put(batchID, Arguments.createMap());
        }
        for (int i = 0; i < requestBatch.size(); i++) {
            GraphRequest request = buildRequest(requestBatch.getMap(i));
            request.setCallback(new GraphRequestCallback(i, batchID));
            batch.add(request);
        }
        batch.setTimeout(timeout);
        GraphRequestBatchCallback callback = new GraphRequestBatchCallback(batchID, batchCallback);
        batch.addCallback(callback);
        batch.executeAsync();
    }

    private GraphRequest buildRequest(ReadableMap requestMap) {
        GraphRequest graphRequest = new GraphRequest();
        graphRequest.setGraphPath(requestMap.getString("graphPath"));
        setConfig(graphRequest, requestMap.getMap("config"));
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
                null));
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

    private WritableMap buildFacebookRequestError(FacebookRequestError error) {
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

    private WritableMap buildGraphResponse(GraphResponse response) {
        if (response.getJSONObject() != null) {
            return convertJSONObject(response.getJSONObject());
        }
        return Arguments.createMap();
    }

    private WritableArray convertJSONArray(JSONArray jsonArray) {
        WritableArray result = Arguments.createArray();
        for (int i = 0; i < jsonArray.length(); i++) {
            Object object;
            try {
                object = jsonArray.get(i);
            } catch (JSONException e) {
                return result;
            }
            if (object instanceof JSONObject) {
                result.pushMap(convertJSONObject((JSONObject) object));
            } else if (object instanceof JSONArray) {
                result.pushArray(convertJSONArray((JSONArray) object));
            } else if (object instanceof String) {
                result.pushString((String) object);
            } else if (object instanceof Integer) {
                result.pushInt((int) object);
            } else if (object instanceof Boolean) {
                result.pushBoolean((Boolean) object);
            } else if (object instanceof Double) {
                result.pushDouble((Double) object);
            }
        }
        return result;
    }

    private WritableMap convertJSONObject(JSONObject object) {
        WritableMap result = Arguments.createMap();
        Iterator<String> keyIterator = object.keys();
        while (keyIterator.hasNext()) {
            String key = keyIterator.next();
            Object value;
            try {
                value = object.get(key);
            } catch (JSONException e) {
                return result;
            }
            if (value instanceof JSONObject) {
                result.putMap(key, convertJSONObject((JSONObject) value));
            } else if (value instanceof JSONArray) {
                result.putArray(key, convertJSONArray((JSONArray) value));
            } else if (value instanceof String) {
                result.putString(key, (String) value);
            } else if (value instanceof Integer) {
                result.putInt(key, (int) value);
            } else if (value instanceof Boolean) {
                result.putBoolean(key, (Boolean) value);
            } else if (value instanceof Double) {
                result.putDouble(key, (Double) value);
            }
        }
        return result;
    }
}
