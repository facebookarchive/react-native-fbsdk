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

#import "RCTFBSDKShareDialog.h"

#import <React/RCTUtils.h>

#import "RCTConvert+FBSDKSharingContent.h"

@implementation RCTConvert (FBSDKShareDialog)

RCT_ENUM_CONVERTER(FBSDKShareDialogMode, (@{
  @"automatic": @(FBSDKShareDialogModeAutomatic),
  @"browser": @(FBSDKShareDialogModeBrowser),
  @"webview": @(FBSDKShareDialogModeWeb),
}), FBSDKShareDialogModeAutomatic, unsignedLongValue)

@end

@implementation RCTFBSDKShareDialog
{
  FBSDKShareDialog *_shareDialog;
  RCTPromiseResolveBlock _showResolve;
  RCTPromiseRejectBlock _showReject;
}

RCT_EXPORT_MODULE(FBShareDialog);

#pragma mark - Object Lifecycle

- (instancetype)init
{
  if (self = [super init]) {
    _shareDialog = [[FBSDKShareDialog alloc] init];
    _shareDialog.delegate = self;
  }
  return self;
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

#pragma mark - React Native Methods

RCT_EXPORT_METHOD(canShow:(RCTFBSDKSharingContent)content resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  _shareDialog.shareContent = content;
  dispatch_async(dispatch_get_main_queue(), ^{
    if ([self->_shareDialog canShow]) {
      NSError *error;
      if ([self->_shareDialog validateWithError:&error]) {
        resolve(@YES);
      } else {
        reject(@"FacebookSDK", @"SharingContent is invalid", error);
      }
    } else {
      resolve(@NO);
    }
  });
}

RCT_EXPORT_METHOD(show:(RCTFBSDKSharingContent)content
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  _showResolve = resolve;
  _showReject = reject;
  _shareDialog.shareContent = content;
  dispatch_async(dispatch_get_main_queue(), ^{
    if (!self->_shareDialog.fromViewController) {
      self->_shareDialog.fromViewController = RCTPresentedViewController();
    }
    [self->_shareDialog show];
  });
}

RCT_EXPORT_METHOD(setMode:(FBSDKShareDialogMode)mode)
{
  _shareDialog.mode = mode;
}

RCT_EXPORT_METHOD(setShouldFailOnDataError:(BOOL)shouldFailOnDataError)
{
  _shareDialog.shouldFailOnDataError = shouldFailOnDataError;
}

#pragma mark - FBSDKSharingDelegate

- (void)sharer:(id<FBSDKSharing>)sharer didCompleteWithResults:(NSDictionary *)results
{
  if (_showResolve) {
    _showResolve(results);
    _showResolve = nil;
  }
  _showReject = nil;
}

- (void)sharer:(id<FBSDKSharing>)sharer didFailWithError:(NSError *)error
{
  if (_showReject) {
    _showReject(@"FacebookSDK", @"ShareDialog encounters error", error);
    _showReject = nil;
  }
  _showResolve = nil;
}

- (void)sharerDidCancel:(id<FBSDKSharing>)sharer
{
  if (_showResolve) {
    _showResolve(@{@"isCancelled": @YES});
    _showResolve = nil;
  }
  _showReject = nil;
}

@end
