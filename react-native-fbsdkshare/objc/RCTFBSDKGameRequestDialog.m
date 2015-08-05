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

#import <RCTConvert.h>
#import <RCTUtils.h>

@implementation RCTConvert (FBSDKGameRequestDialog)

RCT_ENUM_CONVERTER(FBSDKGameRequestActionType, (@{
  @"none": @(FBSDKGameRequestActionTypeNone),
  @"send": @(FBSDKGameRequestActionTypeSend),
  @"ask-for": @(FBSDKGameRequestActionTypeAskFor),
  @"turn": @(FBSDKGameRequestActionTypeTurn),
  }), FBSDKGameRequestActionTypeNone, unsignedIntegerValue)

RCT_ENUM_CONVERTER(FBSDKGameRequestFilter, (@{
  @"none": @(FBSDKGameRequestFilterNone),
  @"app-users": @(FBSDKGameRequestFilterAppUsers),
  @"app-non-users": @(FBSDKGameRequestFilterAppNonUsers),
  }), FBSDKGameRequestActionTypeNone, unsignedIntegerValue)

+ (FBSDKGameRequestContent *)FBSDKGameRequestContent:(id)json
{
  NSDictionary *contentData = [self NSDictionary:json];
  FBSDKGameRequestContent *content = [[FBSDKGameRequestContent alloc] init];
  content.actionType = [RCTConvert FBSDKGameRequestActionType:contentData[@"actionType"]];
  content.data = [RCTConvert NSString:contentData[@"data"]];
  content.filters = [RCTConvert FBSDKGameRequestFilter:contentData[@"filters"]];
  content.message = [RCTConvert NSString:contentData[@"message"]];
  content.objectID = [RCTConvert NSString:contentData[@"objectID"]];
  content.recipients = [RCTConvert NSStringArray:contentData[@"recipients"]];
  content.recipientSuggestions = [RCTConvert NSStringArray:contentData[@"recipientSuggestions"]];
  content.title = [RCTConvert NSString:contentData[@"title"]];
  return content;
}

@end

@interface RCTFBSDKGameRequestDialog () <FBSDKGameRequestDialogDelegate>
@end

@implementation RCTFBSDKGameRequestDialog
{
  FBSDKGameRequestDialog *_dialog;
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
    _dialog = [[FBSDKGameRequestDialog alloc] init];
    _dialog.delegate = self;
  }
  return self;
}

#pragma mark - React Native Methods

RCT_EXPORT_METHOD(show:(FBSDKGameRequestContent *)content callback:(RCTResponseSenderBlock)callback)
{
  _showCallback = callback;
  _dialog.content = content;
  [_dialog show];
}

RCT_EXPORT_METHOD(setFrictionlessRequestsEnabled:(BOOL)frictionlessRequestsEnabled)
{
  _dialog.frictionlessRequestsEnabled = frictionlessRequestsEnabled;
}

#pragma mark - FBSDKSharingDelegate

- (void)gameRequestDialog:(FBSDKGameRequestDialog *)gameRequestDialog didCompleteWithResults:(NSDictionary *)results
{
  _showCallback(@[[NSNull null], results]);
  _showCallback = nil;
}

- (void)gameRequestDialog:(FBSDKGameRequestDialog *)gameRequestDialog didFailWithError:(NSError *)error
{
  _showCallback(@[RCTJSErrorFromNSError(error), [NSNull null]]);
  _showCallback = nil;
}

- (void)gameRequestDialogDidCancel:(FBSDKGameRequestDialog *)gameRequestDialog
{
  _showCallback(@[[NSNull null], @{@"isCancelled": @YES}]);
  _showCallback = nil;
}

@end
