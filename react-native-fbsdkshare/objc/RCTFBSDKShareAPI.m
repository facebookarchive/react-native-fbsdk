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

#import "RCTFBSDKShareAPI.h"

#import <RCTUtils.h>

#import "RCTConvert+FBSDKSharingContent.h"

@implementation RCTFBSDKShareAPI
{
  FBSDKShareAPI *_shareAPI;
  RCTResponseSenderBlock _callback;
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
    _shareAPI = [[FBSDKShareAPI alloc] init];
    _shareAPI.delegate = self;
  }
  return self;
}

#pragma mark - React Native Methods

RCT_EXPORT_METHOD(share:(RCTFBSDKSharingContent)content graphNode:(NSString *)graphNode message:(NSString *)message callback:(RCTResponseSenderBlock)callback)
{
  if (!_callback) {
    _shareAPI.shareContent = content;
    if (graphNode) {
      _shareAPI.graphNode = graphNode;
    }
    _shareAPI.message = message;
    _callback = callback;
    [_shareAPI share];
  } else {
    callback(@[@"Share already in progress.", [NSNull null]]);
  }
}

RCT_EXPORT_METHOD(createOpenGraphObject:(FBSDKShareOpenGraphObject *)openGraphObject callback:(RCTResponseSenderBlock)callback)
{
  if (!_callback) {
    _callback = callback;
    [_shareAPI createOpenGraphObject:openGraphObject];
  } else {
    callback(@[@"Share already in progress.", [NSNull null]]);
  }
}

#pragma mark - FBSDKSharingDelegate

- (void)sharer:(id<FBSDKSharing>)sharer didCompleteWithResults:(NSDictionary *)results
{
  if (_callback) {
    _callback(@[[NSNull null], results]);
    _callback = nil;
  }
}

- (void)sharer:(id<FBSDKSharing>)sharer didFailWithError:(NSError *)error
{
  if (_callback) {
    _callback(@[RCTJSErrorFromNSError(error), [NSNull null]]);
    _callback = nil;
  }
}

@end
