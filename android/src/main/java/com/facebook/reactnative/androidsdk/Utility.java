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

import android.net.Uri;

import com.facebook.AccessToken;
import com.facebook.AccessTokenSource;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.share.model.AppGroupCreationContent;
import com.facebook.share.model.AppInviteContent;
import com.facebook.share.model.GameRequestContent;
import com.facebook.share.model.ShareContent;
import com.facebook.share.model.ShareLinkContent;
import com.facebook.share.model.ShareHashtag;
import com.facebook.share.model.ShareOpenGraphAction;
import com.facebook.share.model.ShareOpenGraphContent;
import com.facebook.share.model.ShareOpenGraphObject;
import com.facebook.share.model.SharePhoto;
import com.facebook.share.model.SharePhotoContent;
import com.facebook.share.model.ShareVideo;
import com.facebook.share.model.ShareVideoContent;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

/**
 * This class is solely for the use of other packages within the React Native Facebook SDK for Android.
 * Use of any of the classes in this package is unsupported, and they may be modified or removed
 * without warning at any time.
 */
public final class Utility {

    public static AccessToken buildAccessToken(ReadableMap accessTokenMap) {
        AccessTokenSource accessTokenSource = AccessTokenSource
                .valueOf(accessTokenMap.getString("accessTokenSource"));
        Date expirationTime = new Date((long) accessTokenMap.getDouble("expirationTime"));
        Date lastRefreshTime = new Date((long) accessTokenMap.getDouble("lastRefreshTime"));
        return new AccessToken(
                accessTokenMap.getString("accessToken"),
                accessTokenMap.getString("applicationID"),
                accessTokenMap.getString("userID"),
                reactArrayToStringList(accessTokenMap.getArray("permissions")),
                reactArrayToStringList(accessTokenMap.getArray("declinedPermissions")),
                accessTokenSource,
                expirationTime,
                lastRefreshTime
        );
    }

    public static WritableMap accessTokenToReactMap(AccessToken accessToken) {
        WritableMap map = Arguments.createMap();
        map.putString("accessToken", accessToken.getToken());
        map.putString("applicationID", accessToken.getApplicationId());
        map.putString("userID", accessToken.getUserId());
        map.putArray(
            "permissions",
            Arguments.fromJavaArgs(setToStringArray(accessToken.getPermissions())));
        map.putArray(
            "declinedPermissions",
            Arguments.fromJavaArgs(setToStringArray(accessToken.getDeclinedPermissions())));
        map.putString("accessTokenSource", accessToken.getSource().name());
        map.putDouble("expirationTime", (double) accessToken.getExpires().getTime());
        map.putDouble("lastRefreshTime", (double) accessToken.getLastRefresh().getTime());
        return map;
    }

    public static ShareContent buildShareContent(ReadableMap shareContentMap) {
        ShareContent shareContent = null;
        if (shareContentMap != null) {
            String contentType = shareContentMap.getString("contentType");
            if (contentType.equals("link")) {
                shareContent = buildShareLinkContent(shareContentMap);
            } else if (contentType.equals("photo")) {
                shareContent = buildSharePhotoContent(shareContentMap);
            } else if (contentType.equals("video")) {
                shareContent = buildShareVideoContent(shareContentMap);
            } else if (contentType.equals("open-graph")) {
                shareContent = buildShareOpenGraphContent(shareContentMap);
            }
        }
        return shareContent;
    }

    public static AppInviteContent buildAppInviteContent(ReadableMap appInviteContentMap) {
        AppInviteContent.Builder appInviteContentBuilder = new AppInviteContent.Builder();
        appInviteContentBuilder.setApplinkUrl(appInviteContentMap.getString("applinkUrl"));
        if (appInviteContentMap.hasKey("previewImageUrl")) {
            appInviteContentBuilder.setPreviewImageUrl(appInviteContentMap.getString("previewImageUrl"));
        }
        String promotionText = getValueOrNull(appInviteContentMap, "promotionText");
        String promotionCode = getValueOrNull(appInviteContentMap, "promotionCode");
        if (promotionText != null && promotionCode != null) {
            appInviteContentBuilder.setPromotionDetails(promotionText, promotionCode);
        }
        return appInviteContentBuilder.build();
    }

    public static AppGroupCreationContent buildAppGroupCreationContent(ReadableMap appGroupCreationContenMap) {
        AppGroupCreationContent.Builder appGroupCreationContentBuilder = new AppGroupCreationContent.Builder();
        appGroupCreationContentBuilder.setName(appGroupCreationContenMap.getString("name"));
        appGroupCreationContentBuilder.setDescription(appGroupCreationContenMap.getString("description"));
        appGroupCreationContentBuilder.setAppGroupPrivacy(
                AppGroupCreationContent.AppGroupPrivacy.valueOf(appGroupCreationContenMap.getString("privacy")));
        return appGroupCreationContentBuilder.build();
    }

    public static GameRequestContent buildGameRequestContent(ReadableMap gameRequestContentMap) {
        GameRequestContent.Builder gameRequestContentBuilder = new GameRequestContent.Builder();
        String actionType = getValueOrNull(gameRequestContentMap, "actionType");
        if (actionType != null) {
            gameRequestContentBuilder.setActionType(
                    GameRequestContent.ActionType.valueOf(actionType.toUpperCase()));
        }
        String filters = getValueOrNull(gameRequestContentMap, "filters");
        if (filters != null) {
            gameRequestContentBuilder.setFilters(
                    GameRequestContent.Filters.valueOf(filters.toUpperCase()));
        }
        gameRequestContentBuilder.setMessage(gameRequestContentMap.getString("message"));
        if (gameRequestContentMap.hasKey("recipients")) {
            gameRequestContentBuilder.setRecipients(
                    reactArrayToStringList(gameRequestContentMap.getArray("recipients")));
        }
        gameRequestContentBuilder.setTitle(getValueOrNull(gameRequestContentMap, "title"));
        gameRequestContentBuilder.setData(getValueOrNull(gameRequestContentMap, "data"));
        gameRequestContentBuilder.setObjectId(getValueOrNull(gameRequestContentMap, "objectId"));
        if (gameRequestContentMap.hasKey("suggestions")) {
            gameRequestContentBuilder.setSuggestions(reactArrayToStringList(
                    gameRequestContentMap.getArray("suggestions")));
        }
        return gameRequestContentBuilder.build();
    }

    public static ShareLinkContent buildShareLinkContent(ReadableMap shareLinkContent) {
        ShareLinkContent.Builder contentBuilder = new ShareLinkContent.Builder();
        contentBuilder.setContentUrl(Uri.parse(shareLinkContent.getString("contentUrl")));
        String url = getValueOrNull(shareLinkContent, "imageUrl");
        contentBuilder.setImageUrl(url != null ? Uri.parse(url) : null);
        contentBuilder.setContentDescription(getValueOrNull(shareLinkContent, "contentDescription"));
        contentBuilder.setContentTitle(getValueOrNull(shareLinkContent, "contentTitle"));
        contentBuilder.setQuote(getValueOrNull(shareLinkContent, "quote"));
        appendGenericContent(contentBuilder, shareLinkContent);
        return contentBuilder.build();
    }

    public static SharePhotoContent buildSharePhotoContent(ReadableMap sharePhotoContent) {
        SharePhotoContent.Builder contentBuilder = new SharePhotoContent.Builder();
        contentBuilder.setPhotos(reactArrayToPhotoList(sharePhotoContent.getArray("photos")));
        String url = getValueOrNull(sharePhotoContent, "contentUrl");
        contentBuilder.setContentUrl(url != null ? Uri.parse(url) : null);
        appendGenericContent(contentBuilder, sharePhotoContent);
        return contentBuilder.build();
    }

    public static SharePhoto buildSharePhoto(ReadableMap photoMap) {
        SharePhoto.Builder photoBuilder = new SharePhoto.Builder();
        photoBuilder.setImageUrl(Uri.parse(photoMap.getString("imageUrl")));
        photoBuilder.setCaption(getValueOrNull(photoMap, "caption"));
        if (photoMap.hasKey("userGenerated")) {
            photoBuilder.setUserGenerated(photoMap.getBoolean("userGenerated"));
        }
        return photoBuilder.build();
    }

    public static ShareContent buildShareVideoContent(ReadableMap shareVideoContent) {
        ShareVideoContent.Builder contentBuilder = new ShareVideoContent.Builder();
        String url = getValueOrNull(shareVideoContent, "contentUrl");
        contentBuilder.setContentUrl(url != null ? Uri.parse(url) : null);
        contentBuilder.setContentDescription(
                getValueOrNull(shareVideoContent, "contentDescription"));
        contentBuilder.setContentTitle(getValueOrNull(shareVideoContent, "contentTitle"));
        if (shareVideoContent.hasKey("previewPhoto")) {
            contentBuilder.setPreviewPhoto(buildSharePhoto(shareVideoContent.getMap("previewPhoto")));
        }
        if (shareVideoContent.hasKey("video")) {
            contentBuilder.setVideo(buildShareVideo(shareVideoContent.getMap("video")));
        }
        appendGenericContent(contentBuilder, shareVideoContent);
        return contentBuilder.build();
    }

    public static ShareContent buildShareOpenGraphContent(ReadableMap shareContent) {
        ShareOpenGraphContent.Builder  contentBuilder = new ShareOpenGraphContent.Builder();
        String url = getValueOrNull(shareContent, "contentUrl");
        contentBuilder.setContentUrl(url != null ? Uri.parse(url) : null);
        contentBuilder.setAction(buildShareOpenGraphAction(shareContent.getMap("action")));
        contentBuilder.setPreviewPropertyName(shareContent.getString("previewPropertyName"));
        appendGenericContent(contentBuilder, shareContent);
        return contentBuilder.build();
    }

    public static ShareOpenGraphAction buildShareOpenGraphAction(ReadableMap shareOpenGraphActionMap) {
        ShareOpenGraphAction.Builder contentBuilder = new ShareOpenGraphAction.Builder();
        contentBuilder.setActionType(shareOpenGraphActionMap.getString("actionType"));
        ReadableMap properties = shareOpenGraphActionMap.getMap("_properties");
        ReadableMapKeySetIterator keySetIterator = properties.keySetIterator();
        while (keySetIterator.hasNextKey()) {
            String key = keySetIterator.nextKey();
            ReadableMap entry = properties.getMap(key);
            contentBuilder.putObject(key, buildShareOpenGraphObject(entry.getMap("value")));
        }
        return contentBuilder.build();
    }

    public static ShareOpenGraphObject buildShareOpenGraphObject(ReadableMap entry) {
        ShareOpenGraphObject.Builder contentBuilder = new ShareOpenGraphObject.Builder();
        ReadableMap value = entry.getMap("_properties");
        ReadableMapKeySetIterator keySetIterator = value.keySetIterator();
        while (keySetIterator.hasNextKey()) {
            String key = keySetIterator.nextKey();
            ReadableMap subEntry = value.getMap(key);
            switch (subEntry.getString("type")) {
                case "number":
                    contentBuilder.putDouble(key, subEntry.getDouble("value"));
                    break;
                case "open-graph-object":
                    contentBuilder.putObject(key, buildShareOpenGraphObject(subEntry.getMap("value")));
                    break;
                case "photo":
                    contentBuilder.putPhoto(key, buildSharePhoto(subEntry.getMap("value")));
                    break;
                case "string":
                    contentBuilder.putString(key, subEntry.getString("value"));
                    break;
            }
        }
        return contentBuilder.build();
    }

    private static void appendGenericContent(ShareContent.Builder contentBuilder, ReadableMap shareContent) {
        if (shareContent.hasKey("commonParameters")) {
            ReadableMap commonParameters = shareContent.getMap("commonParameters");
            contentBuilder.setPeopleIds(
                    commonParameters.hasKey("peopleIds")
                            ? reactArrayToStringList(commonParameters.getArray("peopleIds"))
                            : null);
            contentBuilder.setPlaceId(getValueOrNull(commonParameters, "placeId"));
            contentBuilder.setRef(getValueOrNull(commonParameters, "ref"));
            if (commonParameters.hasKey("hashtag")) {
                ShareHashtag tag = new ShareHashtag.Builder().setHashtag(commonParameters.getString("hashtag")).build();
                contentBuilder.setShareHashtag(tag);
            }
        }
    }

    public static ShareVideo buildShareVideo(ReadableMap videoMap) {
        ShareVideo.Builder videoBuilder = new ShareVideo.Builder();
        if (videoMap.hasKey("localUrl")) {
            videoBuilder.setLocalUrl(Uri.parse(videoMap.getString("localUrl")));
        }
        return videoBuilder.build();
    }

    public static List<SharePhoto> reactArrayToPhotoList(ReadableArray photos) {
        List<SharePhoto> list = new ArrayList<>(photos.size());
        for (int i = 0; i < photos.size(); i++) {
            ReadableMap photoDetail = photos.getMap(i);
            list.add(buildSharePhoto(photoDetail));
        }
        return list;
    }

    public static String getValueOrNull(ReadableMap map, String key) {
        if (map.hasKey(key)) {
            return map.getString(key);
        }
        return null;
    }

    public static List<String> reactArrayToStringList(ReadableArray array) {
        List<String> list = new ArrayList<>(array.size());
        for (int i = 0; i < array.size(); i++) {
            list.add(array.getString(i));
        }
        return list;
    }

    public static WritableArray listToReactArray(List<String> list) {
        WritableArray array = Arguments.createArray();
        for (String e: list) {
            array.pushString(e);
        }
        return array;
    }

    public static String[] setToStringArray(Set<String> set) {
        String[] array = new String[set.size()];
        int i = 0;
        for (String e : set) {
            array[i++] = e;
        }
        return array;
    }
}
