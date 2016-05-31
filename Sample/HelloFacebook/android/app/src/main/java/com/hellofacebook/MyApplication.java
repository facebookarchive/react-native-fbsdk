package com.hellofacebook;

import android.app.Application;

import com.facebook.appevents.AppEventsLogger;
import com.facebook.FacebookSdk;

public class MyApplication extends Application {
    // Updated your class body:
    @Override
    public void onCreate() {
        super.onCreate();
        // Initialize the SDK before executing any other operations.
        FacebookSdk.sdkInitialize(getApplicationContext());
        // Use AppEventsLogger to log custom events.
        AppEventsLogger.activateApp(this);
    }
}