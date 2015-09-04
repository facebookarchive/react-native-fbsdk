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

#import "RCTFBInterstitialAd.h"

#import <RCTConvert.h>
#import <RCTEventDispatcher.h>
#import <RCTUtils.h>

@implementation RCTFBInterstitialAd
{
  FBInterstitialAd *_interstitialAd;
}

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

#pragma mark - React Native Methods

RCT_EXPORT_METHOD(loadInterstitialAd:(NSString *)placementID)
{
  _interstitialAd = [[FBInterstitialAd alloc] initWithPlacementID:placementID];
  _interstitialAd.delegate = self;
  [_interstitialAd loadAd];
}

RCT_EXPORT_METHOD(displayInterstitialAd)
{
  if (_interstitialAd && [_interstitialAd isAdValid]) {
    [_interstitialAd showAdFromRootViewController:[[[[UIApplication sharedApplication] delegate] window] rootViewController]];
  }
}

#pragma mark - FBInterstitialAdDelegate

- (void)interstitialAdDidLoad:(FBInterstitialAd *)interstitialAd
{
  NSDictionary *event = @{
    @"type": @"adViewLoadSuccess",
  };
  [self.bridge.eventDispatcher sendAppEventWithName:@"interstitialAdEvent" body:event];
}

- (void)interstitialAd:(FBInterstitialAd *)interstitialAd didFailWithError:(NSError *)error
{
  NSDictionary *event = @{
    @"type": @"adViewLoadFail",
    @"error": RCTJSErrorFromNSError(error),
  };
  [self.bridge.eventDispatcher sendAppEventWithName:@"interstitialAdEvent" body:event];
}

- (void)interstitialAdDidClick:(FBInterstitialAd *)interstitialAd
{
  NSDictionary *event = @{
    @"type": @"adViewClick",
  };
  [self.bridge.eventDispatcher sendAppEventWithName:@"interstitialAdEvent" body:event];
}

- (void)interstitialAdWillClose:(FBInterstitialAd *)interstitialAd
{
  NSDictionary *event = @{
    @"type": @"adViewWillClose",
  };
  [self.bridge.eventDispatcher sendAppEventWithName:@"interstitialAdEvent" body:event];
}

- (void)interstitialAdDidClose:(FBInterstitialAd *)interstitialAd
{
  NSDictionary *event = @{
    @"type": @"adViewDidClose",
  };
  [self.bridge.eventDispatcher sendAppEventWithName:@"interstitialAdEvent" body:event];
}

@end
