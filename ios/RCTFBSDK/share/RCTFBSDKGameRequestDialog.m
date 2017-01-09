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

#import "RCTFBSDKGameRequestDialog.h"

#import <React/RCTConvert.h>
#import <React/RCTUtils.h>

@implementation RCTConvert (FBSDKGameRequestDialog)

RCT_ENUM_CONVERTER(FBSDKGameRequestActionType, (@{
  @"send": @(FBSDKGameRequestActionTypeSend),
  @"askfor": @(FBSDKGameRequestActionTypeAskFor),
  @"turn": @(FBSDKGameRequestActionTypeTurn),
  }), FBSDKGameRequestActionTypeNone, unsignedIntegerValue)

RCT_ENUM_CONVERTER(FBSDKGameRequestFilter, (@{
  @"app_users": @(FBSDKGameRequestFilterAppUsers),
  @"app_non_users": @(FBSDKGameRequestFilterAppNonUsers),
  }), FBSDKGameRequestActionTypeNone, unsignedIntegerValue)

+ (FBSDKGameRequestContent *)FBSDKGameRequestContent:(id)json
{
  NSDictionary *contentData = [self NSDictionary:json];
  FBSDKGameRequestContent *content = [[FBSDKGameRequestContent alloc] init];
  content.actionType = [RCTConvert FBSDKGameRequestActionType:RCTNilIfNull(contentData[@"actionType"])];
  content.data = [RCTConvert NSString:RCTNilIfNull(contentData[@"data"])];
  content.filters = [RCTConvert FBSDKGameRequestFilter:RCTNilIfNull(contentData[@"filters"])];
  content.message = [RCTConvert NSString:contentData[@"message"]];
  content.objectID = [RCTConvert NSString:RCTNilIfNull(contentData[@"objectId"])];
  content.recipients = [RCTConvert NSStringArray:RCTNilIfNull(contentData[@"recipients"])];
  content.recipientSuggestions = [RCTConvert NSStringArray:RCTNilIfNull(contentData[@"suggestions"])];
  content.title = [RCTConvert NSString:RCTNilIfNull(contentData[@"title"])];
  return content;
}

@end

@interface RCTFBSDKGameRequestDialog () <FBSDKGameRequestDialogDelegate>
@end

@implementation RCTFBSDKGameRequestDialog
{
  FBSDKGameRequestDialog *_dialog;
  RCTPromiseResolveBlock _showResolve;
  RCTPromiseRejectBlock _showReject;
}

RCT_EXPORT_MODULE(FBGameRequestDialog);

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

#pragma mark - Object Lifecycle

- (instancetype)init
{
  if ((self = [super init])) {
    _dialog = [[FBSDKGameRequestDialog alloc] init];
    _dialog.delegate = self;
  }
  return self;
}

#pragma mark - React Native Methods

RCT_EXPORT_METHOD(canShow:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  resolve([NSNumber numberWithBool:[_dialog canShow]]);
}

RCT_EXPORT_METHOD(show:(FBSDKGameRequestContent *)gameRequestContent
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  _showResolve = resolve;
  _showReject = reject;
  [_dialog setContent:gameRequestContent];
  [_dialog show];
}

#pragma mark - FBSDKSharingDelegate

- (void)gameRequestDialog:(FBSDKGameRequestDialog *)gameRequestDialog didCompleteWithResults:(NSDictionary *)results
{
  if (_showResolve) {
    _showResolve(results);
    _showResolve = nil;
  }
  _showReject = nil;
}

- (void)gameRequestDialog:(FBSDKGameRequestDialog *)gameRequestDialog didFailWithError:(NSError *)error
{
  if (_showReject) {
    _showReject(@"FacebookSDK", @"Game Request Dialog encounters error.", error);
    _showReject = nil;
  }
  _showResolve = nil;
}

- (void)gameRequestDialogDidCancel:(FBSDKGameRequestDialog *)gameRequestDialog
{
  if (_showResolve) {
    _showResolve(@{@"isCancelled": @YES});
    _showResolve = nil;
  }
  _showReject = nil;
}

@end
