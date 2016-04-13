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

#import "RCTFBSDKAppInviteDialog.h"

#import <RCTConvert.h>
#import <RCTUtils.h>

@implementation RCTConvert (FBSDKAppInviteDialog)

+ (FBSDKAppInviteContent *)FBSDKAppInviteContent:(id)json
{
  NSDictionary *contentData = [self NSDictionary:json];
  FBSDKAppInviteContent *content = [[FBSDKAppInviteContent alloc] init];
  content.appInvitePreviewImageURL = [RCTConvert NSURL:RCTNilIfNull(contentData[@"previewImageUrl"])];
  content.appLinkURL = [RCTConvert NSURL:contentData[@"applinkUrl"]];
  return content;
}

@end

@interface RCTFBSDKAppInviteDialog () <FBSDKAppInviteDialogDelegate>
@end

@implementation RCTFBSDKAppInviteDialog
{
  FBSDKAppInviteDialog *_dialog;
  RCTPromiseResolveBlock _showResolver;
  RCTPromiseRejectBlock _showRejecter;
}

RCT_EXPORT_MODULE(FBAppInviteDialog);

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

#pragma mark - Object Lifecycle

- (instancetype)init
{
  if ((self = [super init])) {
    _dialog = [[FBSDKAppInviteDialog alloc] init];
    _dialog.delegate = self;
  }
  return self;
}

#pragma mark - React Native Methods

RCT_EXPORT_METHOD(canShow:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  resolve([NSNumber numberWithBool:[_dialog canShow]]);
}

RCT_EXPORT_METHOD(show:(FBSDKAppInviteContent *)content
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  _showResolver = resolve;
  _showRejecter = reject;
  [_dialog setContent:content];
  [_dialog show];

}

#pragma mark - FBSDKAppInviteDialogDelegate

- (void)appInviteDialog:(FBSDKAppInviteDialog *)appInviteDialog didCompleteWithResults:(NSDictionary *)results
{
  if (_showResolver && [results[@"completionGesture"] isEqualToString:@"cancel"]) {
    _showResolver(@{@"isCancelled": @YES});
  } else {
    _showResolver(results);
  }
  _showResolver = nil;
  _showRejecter = nil;
}

- (void)appInviteDialog:(FBSDKAppInviteDialog *)appInviteDialog didFailWithError:(NSError *)error
{
  if (_showRejecter) {
    _showRejecter(@"FacebookSDK", @"App Invite Dialog encounters error", error);
    _showRejecter = nil;
  }
  _showResolver = nil;
}

@end
