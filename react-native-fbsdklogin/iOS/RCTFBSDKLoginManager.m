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

#import "RCTFBSDKLoginManager.h"

#import <RCTUtils.h>

#import "RCTConvert+FBSDKLogin.h"

@implementation RCTFBSDKLoginManager
{
  FBSDKLoginManager *_loginManager;
}

RCT_EXPORT_MODULE();

#pragma mark - Object Lifecycle

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

- (instancetype)init
{
  if ((self = [super init])) {
    _loginManager = [[FBSDKLoginManager alloc] init];
  }
  return self;
}

#pragma mark - React Native Methods

RCT_EXPORT_METHOD(setLoginBehavior:(FBSDKLoginBehavior)behavior)
{
  _loginManager.loginBehavior = behavior;
}

RCT_EXPORT_METHOD(setDefaultAudience:(FBSDKDefaultAudience)audience)
{
  _loginManager.defaultAudience = audience;
}

RCT_EXPORT_METHOD(logInWithReadPermissions:(NSStringArray *)permissions callback:(RCTResponseSenderBlock)callback)
{
  [self _loginWithPermissions:permissions callback:callback isRead:YES];
};

RCT_EXPORT_METHOD(logInWithPublishPermissions:(NSStringArray *)permissions callback:(RCTResponseSenderBlock)callback)
{
  [self _loginWithPermissions:permissions callback:callback isRead:NO];
};

RCT_EXPORT_METHOD(logOut)
{
  [_loginManager logOut];
};

RCT_EXPORT_METHOD(renewSystemCredentials:(RCTResponseSenderBlock)callback)
{
  [FBSDKLoginManager renewSystemCredentials:^(ACAccountCredentialRenewResult result, NSError *error) {
    if (error) {
      callback(@[RCTJSErrorFromNSError(error), [NSNull null]]);
    } else {
      callback(@[[NSNull null], @{@"isCancelled": result == ACAccountCredentialRenewResultRenewed ? @NO : @YES}]);
    }
  }];
}

#pragma mark - Helper Methods

- (void)_loginWithPermissions:(NSStringArray *)permissions callback:(RCTResponseSenderBlock)callback isRead:(BOOL)isRead
{
  FBSDKLoginManagerRequestTokenHandler requestHandler = ^(FBSDKLoginManagerLoginResult *result, NSError *error) {
    callback(
      @[
        error ? RCTJSErrorFromNSError(error) : [NSNull null],
        error ? [NSNull null] : RCTBuildResultDictionary(result)
      ]);
  };
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
  if (isRead) {
    [_loginManager logInWithReadPermissions:permissions handler:requestHandler];
  } else {
    [_loginManager logInWithPublishPermissions:permissions handler:requestHandler];
  }
#pragma clang diagnostic pop
}

static NSDictionary *RCTBuildResultDictionary(FBSDKLoginManagerLoginResult *result)
{
  return @{
    @"isCancelled": @(result.isCancelled),
    @"grantedPermissions": result.isCancelled ? [NSNull null] : result.grantedPermissions.allObjects,
    @"declinedPermissions": result.isCancelled ? [NSNull null] : result.declinedPermissions.allObjects,
  };
}

@end
