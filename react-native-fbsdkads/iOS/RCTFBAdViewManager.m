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

#import "RCTFBAdViewManager.h"

#import <RCTBridge.h>
#import <RCTConvert.h>
#import <RCTEventDispatcher.h>
#import <RCTUtils.h>
#import <UIView+React.h>

@implementation RCTFBAdViewManager

RCT_EXPORT_MODULE()

#pragma mark - Object Lifecycle

- (UIView *)viewWithProps:(NSDictionary *)props
{
  FBAdView *adView = [[FBAdView alloc] initWithPlacementID:props[@"placementID"]
                                                    adSize:[FBAdCustomSize customSize:[self adSizeFromString:props[@"adSize"]]]
                                        rootViewController:[[[[UIApplication sharedApplication] delegate] window] rootViewController]];
  adView.delegate = self;
  [adView loadAd];
  return adView;
}

RCT_EXPORT_VIEW_PROPERTY(placementID, NSString);

RCT_EXPORT_VIEW_PROPERTY(adSize, NSString);

#pragma mark - FBAdViewDelegate

- (void)adView:(FBAdView *)adView didFailWithError:(NSError *)error;
{
  NSDictionary *event = @{
    @"target": adView.reactTag,
    @"type": @"adViewLoadFail",
    @"error": RCTJSErrorFromNSError(error),
  };
  [self.bridge.eventDispatcher sendInputEventWithName:@"topChange" body:event];
}

- (void)adViewDidLoad:(FBAdView *)adView;
{
  NSDictionary *event = @{
    @"target": adView.reactTag,
    @"type": @"adViewLoadSuccess",
  };
  [self.bridge.eventDispatcher sendInputEventWithName:@"topChange" body:event];
}

- (void)adViewDidClick:(FBAdView *)adView
{
  NSDictionary *event = @{
    @"target": adView.reactTag,
    @"type": @"adViewClick",
  };
  [self.bridge.eventDispatcher sendInputEventWithName:@"topChange" body:event];
}

- (void)adViewDidFinishHandlingClick:(FBAdView *)adView
{
  NSDictionary *event = @{
    @"target": adView.reactTag,
    @"type": @"adViewFinishClick",
  };
  [self.bridge.eventDispatcher sendInputEventWithName:@"topChange" body:event];
}

#pragma mark - Helper Functions

- (CGSize)adSizeFromString:(NSString *)adSizeString
{
  NSDictionary *adSizes = @{
    @"kFBAdSize320x50": [NSValue valueWithCGSize:kFBAdSize320x50.size],
    @"kFBAdSizeHeight250Rectangle": [NSValue valueWithCGSize:kFBAdSizeHeight250Rectangle.size],
    @"kFBAdSizeHeight50Banner": [NSValue valueWithCGSize:kFBAdSizeHeight50Banner.size],
    @"kFBAdSizeHeight90Banner": [NSValue valueWithCGSize:kFBAdSizeHeight90Banner.size],
    @"kFBAdSizeInterstitial": [NSValue valueWithCGSize:kFBAdSizeInterstital.size],
  };
  if ([adSizes objectForKey:adSizeString]) {
    return [adSizes[adSizeString] CGSizeValue];
  } else {
    return kFBAdSize320x50.size;
  }
}

@end
