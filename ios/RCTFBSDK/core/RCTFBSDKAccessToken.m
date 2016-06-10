// Copyright (c) 2015-present, Facebook, Inc. All rights reserved.
//
// You are hereby granted a non-exclusive, worldwide, royalty-free license to use,
// copy, modify, and distribute this software in source code or binary form for use
// in connection with the web services and APIs provided by Facebook.
//
// As with any software that integrates with the Facebook platform, your use of
// this software is subject to the Facebook Developer Principles and Policies
// [http://developers.facebook.com/policy/]. This copyright notice shall be
// included in all copies or substantial portions of the software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

#import "RCTFBSDKAccessToken.h"

#import <RCTUtils.h>

#import "RCTConvert+FBSDKAccessToken.h"

@implementation RCTFBSDKAccessToken

RCT_EXPORT_MODULE(FBAccessToken);

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

#pragma mark - React Native Methods

RCT_EXPORT_METHOD(getCurrentAccessToken:(RCTResponseSenderBlock)callback)
{
  FBSDKAccessToken *currentToken = [FBSDKAccessToken currentAccessToken];
  NSDictionary *tokenDict = RCTBuildAccessTokenDict(currentToken);
  callback(@[RCTNullIfNil(tokenDict)]);
}

RCT_EXPORT_METHOD(setCurrentAccessToken:(FBSDKAccessToken *)token)
{
  [FBSDKAccessToken setCurrentAccessToken:token];
}

RCT_EXPORT_METHOD(refreshCurrentAccessTokenAsync:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  [FBSDKAccessToken refreshCurrentAccessToken:^(FBSDKGraphRequestConnection *connection, id result, NSError *error) {
    if (error) {
      reject(@"FacebookSDK", error.localizedDescription, error);
    } else {
      resolve(result);
    }
  }];
}

#pragma mark - Helper Functions

static NSDictionary *RCTBuildAccessTokenDict(FBSDKAccessToken *token)
{
  if (!token) {
    return nil;
  }
  return @{
    @"accessToken": token.tokenString,
    @"applicationID": token.appID,
    @"userID": token.userID,
    @"permissions": token.permissions.allObjects,
    @"declinedPermissions": token.declinedPermissions.allObjects,
    @"expirationTime": @(token.expirationDate.timeIntervalSince1970 * 1000),
    @"lastRefreshTime": @(token.refreshDate.timeIntervalSince1970 * 1000),
  };
}

@end
