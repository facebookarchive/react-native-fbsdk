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

#import <React/RCTUtils.h>

#import "RCTConvert+FBSDKLogin.h"

@implementation RCTFBSDKLoginManager
{
  FBSDKLoginManager *_loginManager;
}

RCT_EXPORT_MODULE(FBLoginManager);

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

+ (BOOL)requiresMainQueueSetup
{
  return YES;
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

RCT_REMAP_METHOD(getLoginBehavior, getLoginBehavior_resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  resolve(LoginBehaviorToString([_loginManager loginBehavior]));
}

RCT_REMAP_METHOD(getDefaultAudience, getDefaultAudience_resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  resolve(DefaultAudienceToString([_loginManager defaultAudience]));
}

RCT_EXPORT_METHOD(logInWithPermissions:(NSArray<NSString *> *)permissions
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  FBSDKLoginManagerLoginResultBlock requestHandler = ^(FBSDKLoginManagerLoginResult *result, NSError *error) {
    if (error) {
      reject(@"FacebookSDK", @"Login Failed", error);
    } else {
      resolve(RCTBuildResultDictionary(result));
    }
  };

  [_loginManager logInWithPermissions:permissions fromViewController:nil handler:requestHandler];
};

RCT_EXPORT_METHOD(logOut)
{
  [_loginManager logOut];
};

#pragma mark - Helper Methods

static NSDictionary *RCTBuildResultDictionary(FBSDKLoginManagerLoginResult *result)
{
  return @{
    @"isCancelled": @(result.isCancelled),
    @"grantedPermissions": result.isCancelled ? [NSNull null] : result.grantedPermissions.allObjects,
    @"declinedPermissions": result.isCancelled ? [NSNull null] : result.declinedPermissions.allObjects,
  };
}

static NSString *LoginBehaviorToString(FBSDKLoginBehavior loginBehavior)
{
  NSString *result = nil;
  switch (loginBehavior) {
    case FBSDKLoginBehaviorBrowser:
      result = @"browser";
      break;
    default:
      break;
  }
  return result;
}


static NSString *DefaultAudienceToString(FBSDKDefaultAudience defaultAudience)
{
  NSString *result = nil;
  switch (defaultAudience) {
    case FBSDKDefaultAudienceFriends:
      result = @"friends";
      break;
    case FBSDKDefaultAudienceEveryone:
      result = @"everyone";
      break;
    case FBSDKDefaultAudienceOnlyMe:
      result = @"only-me";
      break;
    default:
      break;
  }
  return result;
}

@end
