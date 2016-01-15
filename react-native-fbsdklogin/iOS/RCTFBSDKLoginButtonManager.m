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

#import "RCTFBSDKLoginButtonManager.h"

#import <objc/runtime.h>

#import <RCTBridge.h>
#import <RCTEventDispatcher.h>
#import <RCTUtils.h>
#import <UIView+React.h>

#import "RCTConvert+FBSDKLogin.h"

@implementation FBSDKLoginButton (RCTFBSDK)

- (RCTDirectEventBlock)onWillLogin
{
  return objc_getAssociatedObject(self, @selector(onWillLogin));
}

- (void)setOnWillLogin:(RCTDirectEventBlock)onWillLogin
{
  objc_setAssociatedObject(self, @selector(onWillLogin),
                           onWillLogin, OBJC_ASSOCIATION_COPY_NONATOMIC);
}

@end

@implementation RCTFBSDKLoginButtonManager
{
  NSConditionLock *_willLoginLock;
  BOOL _willLogin;
}

RCT_EXPORT_MODULE()

#pragma mark - Object Lifecycle

- (UIView *)view
{
  FBSDKLoginButton *loginButton = [[FBSDKLoginButton alloc] init];
  loginButton.delegate = self;
  return loginButton;
}

#pragma mark - Properties

RCT_EXPORT_VIEW_PROPERTY(readPermissions, NSStringArray)

RCT_EXPORT_VIEW_PROPERTY(publishPermissions, NSStringArray)

RCT_EXPORT_VIEW_PROPERTY(loginBehavior, FBSDKLoginBehavior)

RCT_EXPORT_VIEW_PROPERTY(defaultAudience, FBSDKDefaultAudience)

RCT_EXPORT_VIEW_PROPERTY(onWillLogin, RCTDirectEventBlock)

RCT_EXPORT_VIEW_PROPERTY(tooltipBehavior, FBSDKLoginButtonTooltipBehavior)

#pragma mark - FBSDKLoginButtonDelegate

- (void)loginButton:(FBSDKLoginButton *)loginButton didCompleteWithResult:(FBSDKLoginManagerLoginResult *)result error:(NSError *)error
{
  NSDictionary *event = @{
    @"type": @"loginFinished",
    @"target": loginButton.reactTag,
    @"error": error ? RCTJSErrorFromNSError(error) : [NSNull null],
    @"result": error ? [NSNull null] : @{
      @"isCancelled": @(result.isCancelled),
      @"grantedPermissions": result.isCancelled ? [NSNull null] : result.grantedPermissions.allObjects,
      @"declinedPermissions": result.isCancelled ? [NSNull null] : result.declinedPermissions.allObjects,
    },
  };
  [self.bridge.eventDispatcher sendInputEventWithName:@"topChange" body:event];
}

- (void)loginButtonDidLogOut:(FBSDKLoginButton *)loginButton
{
  NSDictionary *event = @{
    @"target": loginButton.reactTag,
    @"type": @"logoutFinished",
  };
  [self.bridge.eventDispatcher sendInputEventWithName:@"topChange" body:event];
}

- (BOOL)loginButtonWillLogin:(FBSDKLoginButton *)loginButton
{
  if (!loginButton.onWillLogin) {
    return YES;
  }

  static NSInteger condition = 0;
  _willLoginLock = [[NSConditionLock alloc] initWithCondition:condition++];
  _willLogin = YES;
  loginButton.onWillLogin(@{@"lockIdentifier": @(_willLoginLock.condition)});

  // Block the main thread for a maximum of 250ms until the JS thread returns
  if ([_willLoginLock lockWhenCondition:0 beforeDate:[NSDate dateWithTimeIntervalSinceNow:0.25]]) {
    BOOL returnValue = _willLogin;
    [_willLoginLock unlock];
    _willLoginLock = nil;
    return returnValue;
  } else {
    RCTLogWarn(@"Did not receive response to onWillLogin in time, defaulting to YES");
    return YES;
  }
}

RCT_EXPORT_METHOD(resumeLoginWithResult:(BOOL)result lockIdentifier:(NSInteger)lockIdentifier)
{
  if ([_willLoginLock tryLockWhenCondition:lockIdentifier]) {
    _willLogin = result;
    [_willLoginLock unlockWithCondition:0];
  } else {
    RCTLogWarn(@"resumeLoginWithResult invoked with invalid lockIdentifier: "
               "got %zd, expected %zd", lockIdentifier, _willLoginLock.condition);
  }
}

@end
