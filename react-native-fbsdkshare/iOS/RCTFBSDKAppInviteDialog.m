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
  content.appInvitePreviewImageURL = [RCTConvert NSURL:contentData[@"appInvitePreviewImageURL"]];
  content.appLinkURL = [RCTConvert NSURL:contentData[@"appLinkURL"]];
  return content;
}

@end

@interface RCTFBSDKAppInviteDialog () <FBSDKAppInviteDialogDelegate>
@end

@implementation RCTFBSDKAppInviteDialog
{
  FBSDKAppInviteDialog *_dialog;
  RCTResponseSenderBlock _showCallback;
}

RCT_EXPORT_MODULE();

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

RCT_EXPORT_METHOD(show:(FBSDKAppInviteContent *)content callback:(RCTResponseSenderBlock)callback)
{
  _showCallback = callback;
  _dialog.content = content;
  [_dialog show];
}

#pragma mark - FBSDKAppInviteDialogDelegate

- (void)appInviteDialog:(FBSDKAppInviteDialog *)appInviteDialog didCompleteWithResults:(NSDictionary *)results
{
  if ([results[@"completionGesture"] isEqualToString:@"cancel"]) {
    _showCallback(@[[NSNull null], @{@"isCancelled": @YES}]);
  } else if (results == NULL) {
    _showCallback(@[[NSNull null], [NSNull null]]);
  } else {
    _showCallback(@[[NSNull null], results]);
  }
  _showCallback = nil;
}

- (void)appInviteDialog:(FBSDKAppInviteDialog *)appInviteDialog didFailWithError:(NSError *)error
{
  _showCallback(@[RCTJSErrorFromNSError(error), [NSNull null]]);
  _showCallback = nil;
}

@end
