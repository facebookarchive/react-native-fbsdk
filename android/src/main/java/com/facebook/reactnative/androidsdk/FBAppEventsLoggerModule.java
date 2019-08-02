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

import androidx.annotation.Nullable;

import com.facebook.appevents.AppEventsConstants;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.module.annotations.ReactModule;

import java.math.BigDecimal;
import java.util.Currency;

/**
 * <p>
 * This class allows the developer to log various types of events back to Facebook.
 * </p>
 * <p>
 * This client-side event logging is then available through Facebook App Insights
 * and for use with Facebook Ads conversion tracking and optimization.
 * </p>
 * <p>
 * The class has a few related roles:
 * </p>
 * <ul>
 * <li>
 * Logging predefined and application-defined events to Facebook App Insights with a
 * numeric value to sum across a large number of events, and an optional set of key/value
 * parameters that define "segments" for this event (e.g., 'purchaserStatus' : 'frequent', or
 * 'gamerLevel' : 'intermediate').  These events may also be used for ads conversion tracking,
 * optimization, and other ads related targeting in the future.
 * </li>
 * <li>
 * Methods that control the way in which events are flushed out to the Facebook servers.
 * </li>
 * </ul>
 * <p>
 * Here are some important characteristics of the logging mechanism:
 * <ul>
 * <li>
 * Events are not sent immediately when logged.  They're cached and flushed out to the
 * Facebook servers in a number of situations:
 * <ul>
 * <li>when an event count threshold is passed (currently 100 logged events).</li>
 * <li>when a time threshold is passed (currently 15 seconds).</li>
 * <li>when an app has gone to background and is then brought back to the foreground.</li>
 * </ul>
 * <li>
 * Events will be accumulated when the app is in a disconnected state, and sent when the connection
 * is restored and one of the above 'flush' conditions are met.
 * </li>
 * <li>
 * The class is intended to be used from the thread it was created on.  Multiple
 * AppEventsLoggers may be created on other threads if desired.
 * </li>
 * <li>
 * The developer can call the setFlushBehavior method to force the flushing of events to only
 * occur on an explicit call to the `flush` method.
 * </li>
 * </ul>
 * </p>
 * <p>
 * Some things to note when logging events:
 * <ul>
 * <li>
 * There is a limit on the number of unique event names an app can use, on the order of 1000.
 * </li>
 * <li>
 * There is a limit to the number of unique parameter names in the provided parameters that can
 * be used per event, on the order of 25.  This is not just for an individual call, but for all
 * invocations for that eventName.
 * </li>
 * <li>
 * Event names and parameter names must be between 2 and 40
 * characters, and must consist of alphanumeric characters, _, -, or spaces.
 * </li>
 * <li>
 * The length of each parameter value can be no more than on the order of 100 characters.
 * </li>
 * </ul>
 * </p>
 */
@ReactModule(name = FBAppEventsLoggerModule.NAME)
public class FBAppEventsLoggerModule extends ReactContextBaseJavaModule {

    public static final String NAME = "FBAppEventsLogger";

    private AppEventsLogger mAppEventLogger;
    private ReactApplicationContext mReactContext;

    public FBAppEventsLoggerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    @Override
    public void initialize() {
        mAppEventLogger = AppEventsLogger.newLogger(mReactContext);
    }

    @Override
    public String getName() {
        return NAME;
    }

    /**
     * Set the behavior that this AppEventsLogger uses to determine when to flush logged events to
     * the server. This setting applies to all instances of AppEventsLogger.
     * @param flushBehavior the desired behavior.
     */
    @ReactMethod
    public void setFlushBehavior(String flushBehavior) {
        AppEventsLogger.setFlushBehavior(AppEventsLogger.FlushBehavior.valueOf(flushBehavior.toUpperCase()));
    }

    /**
     * Log an app event with the specified name.
     * @param eventName eventName used to denote the event. Choose amongst the EVENT_NAME_*
     *                  constants in {@link AppEventsConstants} when possible.  Or create your own
     *                  if none of the EVENT_NAME_* constants are applicable. Event names should be
     *                  40 characters or less, alphanumeric, and can include spaces, underscores or
     *                  hyphens, but must not have a space or hyphen as the first character.  Any
     *                  given app should have no more than 1000 distinct event names.
     * @param valueToSum a value to associate with the event which will be summed up in Insights for
     *                   across all instances of the event, so that average values can be
     *                   determined, etc.
     * @param parameters Parameters to log with the event.  Insights will allow looking
     *                   at the logs of these events via different parameter values.  You can log on
     *                   the order of 25 parameters with each distinct eventName.  It's advisable to
     *                   limit the number of unique values provided for each parameter in the
     *                   thousands.  As an example, don't attempt to provide a unique
     *                   parameter value for each unique user in your app.  You won't get meaningful
     *                   aggregate reporting on so many parameter values.  The values in the bundles
     *                   should be Strings or numeric values.
     */
    @ReactMethod
    public void logEvent(String eventName, double valueToSum, ReadableMap parameters) {
        mAppEventLogger.logEvent(eventName, valueToSum, Arguments.toBundle(parameters));
    }

    /**
     * Logs a purchase event with Facebook, in the specified amount and with the specified
     * currency.
     * @param purchaseAmount Amount of purchase, in the currency specified by the 'currencyCode'
     *                       parameter. This value will be rounded to the thousandths place (e.g.,
     *                       12.34567 becomes 12.346).
     * @param currencyCode A currency corresponding to an
     *                     <a href="http://en.wikipedia.org/wiki/ISO_4217">ISO 4217</a>
     *                     currency code such as "EUR" or "USD".
     * @param parameters Arbitrary additional information for describing this event. This should
     *                   have no more than 24 entries, and keys should be mostly consistent from
     *                   one purchase event to the next.
     */
    @ReactMethod
    public void logPurchase(double purchaseAmount, String currencyCode,
      @Nullable ReadableMap parameters) {
        mAppEventLogger.logPurchase(
                BigDecimal.valueOf(purchaseAmount),
                Currency.getInstance(currencyCode),
                Arguments.toBundle(parameters));
    }

    /**
     * Logs an app event that tracks that the application was open via Push Notification.
     * @param payload Notification payload received.
     */
     @ReactMethod
     public void logPushNotificationOpen(@Nullable ReadableMap payload) {
         mAppEventLogger.logPushNotificationOpen(Arguments.toBundle(payload));
     }

    /**
     * Sets a user id to associate with all app events. This can be used to associate your own
     * user id with the app events logged from this instance of an application.
     *
     * The user ID will be persisted between application instantces.
     *
     * @param userID A User ID
     */
     @ReactMethod
     public void setUserID(final String userID) {
         mAppEventLogger.setUserID(userID);
     }

     /**
      * Returns the set user id or null if not set
      *
      * @return The set User ID or null
      */
     @ReactMethod(isBlockingSynchronousMethod = true)
     @Nullable
     public String getUserID() {
       return mAppEventLogger.getUserID();
     }

     /**
      * Sends a request to update the properties for the current user, set by
      * setUserID. You must call setUserID before making this call.
      *
      * @param parameters Key-value pairs representing user properties and their values.
      */
     @ReactMethod
     public void updateUserProperties(ReadableMap parameters) {
       mAppEventLogger.updateUserProperties(Arguments.toBundle(parameters), null);
     }

    private @Nullable String getNullableString(ReadableMap data, String key) {
      return data.hasKey(key) ? data.getString(key) : null;
    }

    /**
     * Set additional data about the user to increase chances of matching a Facebook user.
     *
     * @param userData Key-value pairs representing user data and their values.
     */
    @ReactMethod
    public void setUserData(ReadableMap userData) {
      AppEventsLogger.setUserData(
        getNullableString(userData, "email"),
        getNullableString(userData, "firstName"),
        getNullableString(userData, "lastName"),
        getNullableString(userData, "phone"),
        getNullableString(userData, "dateOfBirth"),
        getNullableString(userData, "gender"),
        getNullableString(userData, "city"),
        getNullableString(userData, "state"),
        getNullableString(userData, "zip"),
        getNullableString(userData, "country")
      );
    }

    /**
     * Explicitly flush any stored events to the server.  Implicit flushes may happen depending on
     * the value of getFlushBehavior.  This method allows for explicit, app invoked flushing.
     */
    @ReactMethod
    public void flush() {
        mAppEventLogger.flush();
    }

    /**
     * Sets and sends registration id to register the current app for push notifications.
     * @param registrationId RegistrationId received from GCM.
     */
    @ReactMethod
    public void setPushNotificationsRegistrationId(String registrationId) {
        AppEventsLogger.setPushNotificationsRegistrationId(registrationId);
    }
}
