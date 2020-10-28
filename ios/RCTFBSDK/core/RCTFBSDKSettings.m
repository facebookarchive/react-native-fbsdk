/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "RCTFBSDKSettings.h"

#import <React/RCTConvert.h>

@implementation RCTFBSDKSettings

RCT_EXPORT_MODULE(FBSettings);

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

#pragma mark - React Native Methods

RCT_EXPORT_METHOD(getAdvertiserTrackingEnabled:(RCTResponseSenderBlock)callback)
{
  BOOL ATE = [FBSDKSettings isAdvertiserTrackingEnabled];
  callback(@[@(ATE)]);
}

RCT_EXPORT_METHOD(setAdvertiserTrackingEnabled:(BOOL)ATE callback:(RCTResponseSenderBlock)callback)
{
  BOOL result = [FBSDKSettings setAdvertiserTrackingEnabled:ATE];
  callback(@[@(result)]);
}

RCT_EXPORT_METHOD(setDataProcessingOptions:(nullable NSStringArray *)options)
{
  [FBSDKSettings setDataProcessingOptions:options];
}

RCT_EXPORT_METHOD(setDataProcessingOptions:(nullable NSStringArray *)options country:(int)country state:(int)state)
{
  [FBSDKSettings setDataProcessingOptions:options country:country state:state];
}

@end
