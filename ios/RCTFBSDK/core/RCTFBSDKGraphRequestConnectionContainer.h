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

#import <React/RCTBridgeModule.h>

#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <Foundation/Foundation.h>

/*!
 @abstract A RCTFBSDKGraphRequestConnectionContainer object can take in a batch of
 graph requests, send the requests in a graph request connection and return the responses of
 the requests in a connection callback.
 Note that the oject has a speical life cycle. It retains itself once the  `start` method is called.
 This is because the object needs to live long enough to forward along callbacks from each request.
 It will release itself when all callbacks are handled.
 */
@interface RCTFBSDKGraphRequestConnectionContainer : NSObject<FBSDKGraphRequestConnectionDelegate>

/*!
 @abstract  Initialize the RCTFBSDKGraphRequestConnectionContainer object.
 @param requestBatch  The batch of requests to be sent
 @param timeout   The timeout interval to wait for a response before giving up
 @param callback  The connection callback to be invoked when the connection is completed.
                  This callback will carry the responses of requests back to javascript.
 */
- (instancetype)initWithRequestBatch:(NSArray *)requestBatch
                             timeout:(NSInteger)timeout
                       batchCallback:(RCTResponseSenderBlock)callback;

/*!
 @abstract  Send the batch of requests via a FBSDKGraphRequestConnection.
 */
- (void)start;

@end
