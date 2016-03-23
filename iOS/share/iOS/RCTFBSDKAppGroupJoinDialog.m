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

#import "RCTFBSDKAppGroupJoinDialog.h"

#import <RCTUtils.h>

@implementation RCTFBSDKAppGroupJoinDialog
{
  FBSDKAppGroupJoinDialog *_dialog;
  RCTPromiseResolveBlock _showResolve;
  RCTPromiseRejectBlock _showReject;
}

RCT_EXPORT_MODULE(FBJoinAppGroupDialog);

#pragma mark - Object Lifecycle

- (instancetype)init
{
  if (self = [super init]) {
    _dialog = [[FBSDKAppGroupJoinDialog alloc] init];
    _dialog.delegate = self;
  }
  return self;
}

#pragma mark - React Native Methods

RCT_EXPORT_METHOD(canShow:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  resolve([NSNumber numberWithBool:[_dialog canShow]]);
}

RCT_EXPORT_METHOD(show:(NSString *)groupID
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  _showResolve = resolve;
  _showReject = reject;
  [_dialog setGroupID:groupID];
  dispatch_async(dispatch_get_main_queue(), ^{
    [_dialog show];
  });
}

#pragma mark - FBSDKAppGroupJoinDialogDelegate

- (void)appGroupJoinDialog:(FBSDKAppGroupJoinDialog *)dialog didCompleteWithResults:(NSDictionary *)results
{
  if (_showResolve) {
    _showResolve(results);
    _showResolve = nil;
  }
  _showReject = nil;
}

- (void)appGroupJoinDialog:(FBSDKAppGroupJoinDialog *)dialog didFailWithError:(NSError *)error
{
  if (_showReject) {
    _showReject(@"FacebookSDK", @"Join App Group Dialg encounters error", error);
    _showReject = nil;
  }
  _showResolve = nil;
}

- (void)appGroupJoinDialogDidCancel:(FBSDKAppGroupJoinDialog *)dialog
{
  if (_showResolve) {
    _showResolve(@{@"isCancelled": @YES});
    _showResolve = nil;
  }
  _showReject = nil;
}

@end
