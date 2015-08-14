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

#import "RCTFBSDKAppGroupAddDialog.h"

#import <RCTConvert.h>
#import <RCTUtils.h>

@implementation RCTConvert (FBSDKAppGroupAddDialog)

+ (FBSDKAppGroupContent *)FBSDKAppGroupContent:(id)json
{
  NSDictionary *contentData = [self NSDictionary:json];
  FBSDKAppGroupContent *content = [[FBSDKAppGroupContent alloc] init];
  content.groupDescription = [RCTConvert NSString:contentData[@"groupDescription"]];
  content.name = [RCTConvert NSString:contentData[@"name"]];
  content.privacy = [RCTConvert FBSDKAppGroupPrivacy:[RCTConvert NSString:contentData[@"privacy"]]];
  return content;
}

RCT_ENUM_CONVERTER(FBSDKAppGroupPrivacy, (@{
  @"open": @(FBSDKAppGroupPrivacyOpen),
  @"closed": @(FBSDKAppGroupPrivacyClosed),
  }), FBSDKAppGroupPrivacyOpen, integerValue)

@end

@implementation RCTFBSDKAppGroupAddDialog
{
  FBSDKAppGroupAddDialog *_dialog;
  RCTResponseSenderBlock _showCallback;
}

RCT_EXPORT_MODULE();

#pragma mark - Object Lifecycle

- (instancetype)init
{
  if (self = [super init]) {
    _dialog = [[FBSDKAppGroupAddDialog alloc] init];
    _dialog.delegate = self;
  }
  return self;
}

#pragma mark - React Native Methods

RCT_EXPORT_METHOD(show:(FBSDKAppGroupContent *)content callback:(RCTResponseSenderBlock)callback)
{
  _showCallback = callback;
  _dialog.content = content;
  dispatch_async(dispatch_get_main_queue(), ^{
    [_dialog show];
  });
}

#pragma mark - FBSDKAppGroupAddDialogDelegate

- (void)appGroupAddDialog:(FBSDKAppGroupAddDialog *)dialog didCompleteWithResults:(NSDictionary *)results
{
  _showCallback(@[[NSNull null], results]);
  _showCallback = nil;
}

- (void)appGroupAddDialog:(FBSDKAppGroupAddDialog *)dialog didFailWithError:(NSError *)error
{
  _showCallback(@[RCTJSErrorFromNSError(error), [NSNull null]]);
  _showCallback = nil;
}

- (void)appGroupAddDialogDidCancel:(FBSDKAppGroupAddDialog *)sharer
{
  _showCallback(@[[NSNull null], @{@"isCancelled": @YES}]);
  _showCallback = nil;
}

@end
