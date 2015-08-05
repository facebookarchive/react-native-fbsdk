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

#import "RCTFBSDKLikeControlManager.h"

#import <RCTBridge.h>
#import <RCTConvert.h>
#import <RCTEventDispatcher.h>
#import <UIView+React.h>

#import <Foundation/Foundation.h>

@implementation RCTConvert (FBSDKLike)

RCT_ENUM_CONVERTER(FBSDKLikeObjectType, (@{
  @"open-graph": @(FBSDKLikeObjectTypeOpenGraph),
  @"page": @(FBSDKLikeObjectTypePage),
  @"unknown": @(FBSDKLikeObjectTypeUnknown),
}), FBSDKLikeObjectTypeUnknown, unsignedLongValue)

RCT_ENUM_CONVERTER(FBSDKLikeControlAuxiliaryPosition, (@{
  @"bottom": @(FBSDKLikeControlAuxiliaryPositionBottom),
  @"inline": @(FBSDKLikeControlAuxiliaryPositionInline),
  @"top": @(FBSDKLikeControlAuxiliaryPositionTop),
}), FBSDKLikeControlAuxiliaryPositionInline, unsignedLongValue)

RCT_ENUM_CONVERTER(FBSDKLikeControlHorizontalAlignment, (@{
  @"center": @(FBSDKLikeControlHorizontalAlignmentCenter),
  @"left": @(FBSDKLikeControlHorizontalAlignmentLeft),
  @"right": @(FBSDKLikeControlHorizontalAlignmentRight),
}), FBSDKLikeControlHorizontalAlignmentCenter, unsignedLongValue)

RCT_ENUM_CONVERTER(FBSDKLikeControlStyle, (@{
  @"standard": @(FBSDKLikeControlStyleStandard),
  @"box-count": @(FBSDKLikeControlStyleBoxCount),
}), FBSDKLikeControlStyleStandard, unsignedLongValue)

@end

@implementation RCTFBSDKLikeControlManager

RCT_EXPORT_MODULE()

#pragma mark - Object Lifecycle

- (UIView *)view
{
  FBSDKLikeControl *likeControl = [[FBSDKLikeControl alloc] init];
  return likeControl;
}

#pragma mark - Properties

RCT_EXPORT_VIEW_PROPERTY(objectID, NSString)

RCT_EXPORT_VIEW_PROPERTY(objectType, FBSDKLikeObjectType)

RCT_EXPORT_VIEW_PROPERTY(foregroundColor, UIColor)

RCT_EXPORT_VIEW_PROPERTY(likeControlAuxiliaryPosition, FBSDKLikeControlAuxiliaryPosition)

RCT_EXPORT_VIEW_PROPERTY(likeControlHorizontalAlignment, FBSDKLikeControlHorizontalAlignment)

RCT_EXPORT_VIEW_PROPERTY(likeControlStyle, FBSDKLikeControlStyle)

RCT_EXPORT_VIEW_PROPERTY(soundEnabled, BOOL)

@end
