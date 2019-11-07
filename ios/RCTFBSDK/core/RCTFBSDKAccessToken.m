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

#import <React/RCTUtils.h>

#import "RCTConvert+FBSDKAccessToken.h"

static NSString *const kFBSDKAccessTokenDidChangeEvent = @"fbsdk.accessTokenDidChange";

@implementation RCTFBSDKAccessToken {
  BOOL _isObserving;
}

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

#pragma mark - Event Methods

- (NSArray *)supportedEvents
{
  return @[kFBSDKAccessTokenDidChangeEvent];
}

- (void)startObserving
{
  _isObserving = YES;
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(accessTokenDidChange:)
                                               name:FBSDKAccessTokenDidChangeNotification
                                             object:nil];
}

- (void)stopObserving
{
  _isObserving = NO;
  [[NSNotificationCenter defaultCenter] removeObserver:self
                                                  name:FBSDKAccessTokenDidChangeNotification
                                                object:nil];
}

- (void)accessTokenDidChange:(NSNotification*)notification
{
  if ([notification.name isEqualToString:FBSDKAccessTokenDidChangeNotification] && _isObserving) {
    NSDictionary *body = RCTBuildAccessTokenDict([FBSDKAccessToken currentAccessToken]);
    [self sendEventWithName:kFBSDKAccessTokenDidChangeEvent body:body ?: [NSNull null]];
  }
}

#pragma mark - Helper Functions

static NSDictionary *RCTBuildAccessTokenDict(FBSDKAccessToken *token)
{
  if (!token) {
    return nil;
  }
  return @{
    @"accessToken": token.tokenString,
    @"permissions": token.permissions.allObjects,
    @"declinedPermissions": token.declinedPermissions.allObjects,
    @"expiredPermissions": token.expiredPermissions.allObjects,
    @"applicationID": token.appID,
    @"userID": token.userID,
    @"expirationTime": @(token.expirationDate.timeIntervalSince1970 * 1000),
    @"lastRefreshTime": @(token.refreshDate.timeIntervalSince1970 * 1000),
    @"dataAccessExpirationTime": @(token.dataAccessExpirationDate.timeIntervalSince1970 * 1000),
  };
}

@end
