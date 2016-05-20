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
  content.groupDescription = [RCTConvert NSString:contentData[@"description"]];
  content.name = [RCTConvert NSString:contentData[@"name"]];
  content.privacy = [RCTConvert FBSDKAppGroupPrivacy:[RCTConvert NSString:[contentData[@"privacy"] lowercaseString]]];
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
  RCTPromiseResolveBlock _showResolver;
  RCTPromiseRejectBlock _showRejecter;
}

RCT_EXPORT_MODULE(FBCreateAppGroupDialog);

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

RCT_EXPORT_METHOD(canShow:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  resolve([NSNumber numberWithBool:[_dialog canShow]]);
}

RCT_EXPORT_METHOD(show:(FBSDKAppGroupContent *)content
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  _showResolver = resolve;
  _showRejecter = reject;
  [_dialog setContent:content];
  dispatch_async(dispatch_get_main_queue(), ^{
    [_dialog show];
  });
}

#pragma mark - FBSDKAppGroupAddDialogDelegate

- (void)appGroupAddDialog:(FBSDKAppGroupAddDialog *)dialog didCompleteWithResults:(NSDictionary *)results
{
  if (_showResolver) {
    _showResolver(results);
    _showResolver = nil;
  }
  _showRejecter = nil;
}

- (void)appGroupAddDialog:(FBSDKAppGroupAddDialog *)dialog didFailWithError:(NSError *)error
{
  if (_showRejecter) {
    _showRejecter(@"FaceboookSDK", @"App Group Creation Dialog encounters error", error);
    _showRejecter = nil;
  }
  _showResolver = nil;
}

- (void)appGroupAddDialogDidCancel:(FBSDKAppGroupAddDialog *)sharer
{
  if (_showResolver) {
    _showResolver(@{@"isCancelled": @YES});
    _showResolver = nil;
  }
  _showRejecter = nil;
}

@end
