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

#import "RCTFBNativeAd.h"

#import <RCTConvert.h>
#import <RCTEventDispatcher.h>
#import <RCTUtils.h>

@implementation RCTFBNativeAd
{
  RCTResponseSenderBlock _callback;
}

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

#pragma mark - React Native Methods

RCT_EXPORT_METHOD(loadNativeAd:(NSString *)placementID callback:(RCTResponseSenderBlock)callback)
{
  _callback = callback;
  FBNativeAd *nativeAd = [[FBNativeAd alloc] initWithPlacementID:placementID];
  nativeAd.delegate = self;
  [nativeAd loadAd];
}

#pragma mark - FBNativeAdDelegate

- (void)nativeAdDidLoad:(FBNativeAd *)nativeAd
{
  _callback(@[[NSNull null], @{
    @"title": nativeAd.title,
    @"subtitle": nativeAd.subtitle,
    @"socialContext": nativeAd.socialContext,
    @"callToAction": nativeAd.callToAction,
    @"body": nativeAd.body,
    @"placementID": nativeAd.placementID,
    @"icon": @{
      @"url": nativeAd.icon.url.absoluteString,
      @"width": @(nativeAd.icon.width),
      @"height": @(nativeAd.icon.height),
    },
    @"coverImage": @{
      @"url": nativeAd.coverImage.url.absoluteString,
      @"width": @(nativeAd.icon.width),
      @"height": @(nativeAd.icon.height),
    },
    @"starRating": @{
      @"value": @(nativeAd.starRating.value),
      @"scale": @(nativeAd.starRating.scale),
    },
  }]);
  _callback = nil;
}

- (void)nativeAd:(FBNativeAd *)nativeAd didFailWithError:(NSError *)error
{
  _callback(@[RCTJSErrorFromNSError(error), [NSNull null]]);
  _callback = nil;
}

@end
