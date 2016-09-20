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
  @"open_graph": @(FBSDKLikeObjectTypeOpenGraph),
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
  @"box_count": @(FBSDKLikeControlStyleBoxCount),
}), FBSDKLikeControlStyleStandard, unsignedLongValue)

@end

@interface RCTFBSDKLikeObjectIdAndType : NSObject
{
  NSString *objectID;
  FBSDKLikeObjectType objectType;
}
@end

@implementation RCTFBSDKLikeControlManager

RCT_EXPORT_MODULE(RCTFBLikeView)

#pragma mark - Object Lifecycle

- (UIView *)view
{
  FBSDKLikeControl *likeControl = [[FBSDKLikeControl alloc] init];
  return likeControl;
}

#pragma mark - Properties

RCT_CUSTOM_VIEW_PROPERTY(objectIdAndType, RCTFBSDKObjectIdAndType, FBSDKLikeControl)
{
  [view setObjectID:[RCTConvert NSString:json[@"objectId"]]];
  [view setObjectType:[RCTConvert FBSDKLikeObjectType:json[@"objectType"]]];
}

RCT_EXPORT_VIEW_PROPERTY(foregroundColor, UIColor)

RCT_CUSTOM_VIEW_PROPERTY(auxiliaryViewPosition, FBSDKLikeControlAuxiliaryPosition, FBSDKLikeControl)
{
  [view setLikeControlAuxiliaryPosition:json ? [RCTConvert FBSDKLikeControlAuxiliaryPosition:json] : FBSDKLikeControlAuxiliaryPositionInline];
}

RCT_CUSTOM_VIEW_PROPERTY(horizontalAlignment, FBSDKLikeControlHorizontalAlignment, FBSDKLikeControl)
{
  [view setLikeControlHorizontalAlignment:json ? [RCTConvert FBSDKLikeControlHorizontalAlignment:json] : FBSDKLikeControlHorizontalAlignmentCenter];
}

RCT_CUSTOM_VIEW_PROPERTY(likeViewStyle, FBSDKLikeControlStyle, FBSDKLikeControl)
{
  [view setLikeControlStyle:json ? [RCTConvert FBSDKLikeControlStyle:json] : FBSDKLikeControlStyleStandard];
}

RCT_EXPORT_VIEW_PROPERTY(soundEnabled, BOOL)

@end
