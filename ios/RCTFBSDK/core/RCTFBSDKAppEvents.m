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

#import "RCTFBSDKAppEvents.h"

#import "RCTConvert+FBSDKAccessToken.h"

@implementation RCTConvert (RCTFBSDKAppEvents)

RCT_ENUM_CONVERTER(FBSDKAppEventsFlushBehavior, (@{
  @"auto": @(FBSDKAppEventsFlushBehaviorAuto),
  @"explicit-only": @(FBSDKAppEventsFlushBehaviorExplicitOnly),
}), FBSDKAppEventsFlushBehaviorAuto, unsignedIntegerValue)

@end

@implementation RCTFBSDKAppEvents

RCT_EXPORT_MODULE(FBAppEventsLogger);

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

#pragma mark - React Native Methods

RCT_EXPORT_METHOD(logEvent:(NSString *)eventName
                valueToSum:(nonnull NSNumber *)valueToSum
                parameters:(NSDictionary *)parameters)
{
  [FBSDKAppEvents logEvent:eventName
                valueToSum:valueToSum
                parameters:parameters
               accessToken:nil];
}

RCT_EXPORT_METHOD(logPurchase:(double)purchaseAmount
                     currency:(NSString *)currency
                   parameters:(NSDictionary *)parameters)
{
  [FBSDKAppEvents logPurchase:purchaseAmount
                     currency:currency
                   parameters:parameters
                  accessToken:nil];
}

RCT_EXPORT_METHOD(setFlushBehavior:(FBSDKAppEventsFlushBehavior)flushBehavior)
{
  [FBSDKAppEvents setFlushBehavior:flushBehavior];
}

RCT_EXPORT_METHOD(flush)
{
  [FBSDKAppEvents flush];
}

@end
