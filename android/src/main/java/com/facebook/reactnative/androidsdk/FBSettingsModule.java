/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

package com.facebook.reactnative.androidsdk;

import androidx.annotation.Nullable;

import com.facebook.FacebookSdk;
import com.facebook.react.bridge.BaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

/**
 * This is a {@link NativeModule} that allows JS to use SDK settings in Facebook Android SDK.
 */
@ReactModule(name = FBSettingsModule.NAME)
public class FBSettingsModule extends BaseJavaModule {

    public static final String NAME = "FBSettings";

    public FBSettingsModule() {}

    @Override
    public String getName() {
        return NAME;
    }

    /**
     * Sets data processing options
     * @param options list of the options
     */
    @ReactMethod
    public void setDataProcessingOptions(@Nullable String[] options) {
        FacebookSdk.setDataProcessingOptions(options, 0, 0);
    }

    /**
     * Sets data processing options with country and state
     * @param options list of the options
     * @param country code of the country
     * @param state code of the state
     */
    @ReactMethod
    public static void setDataProcessingOptionsExtra(@Nullable String[] options, int country, int state) {
        FacebookSdk.setDataProcessingOptions(options, country, state);
    }
}
