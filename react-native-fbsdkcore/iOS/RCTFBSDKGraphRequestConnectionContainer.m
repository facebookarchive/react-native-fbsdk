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

#import "RCTFBSDKGraphRequestConnectionContainer.h"

@implementation RCTFBSDKGraphRequestConnectionContainer
{
  NSNumber *_connectionID;
  RCTFBSDKGraphRequestManager *_requestManager;
}

#pragma mark - Object Lifecycle

- (instancetype)initWithRequestManager:(RCTFBSDKGraphRequestManager *)requestManager connectionID:(NSNumber *)connectionID
{
  if ((self = [super init])) {
    _connectionID = connectionID;
    _requestManager = requestManager;
    _connection = [[FBSDKGraphRequestConnection alloc] init];
    _connection.delegate = self;
  }
  return self;
}

#pragma mark - FBSDKGraphRequestConnectionDelegate

- (void)requestConnectionDidFinishLoading:(FBSDKGraphRequestConnection *)connection
{
  if (_callback) {
    _callback(@[[NSNull null]]);
    _callback = nil;
  }
  // These connections are started on the main thread, so we shouldn't have to worry about multiple
  // connections trying to remove themselves all at once.
  [_requestManager removeConnection:_connectionID];
}

- (void)requestConnection:(FBSDKGraphRequestConnection *)connection didFailWithError:(NSError *)error
{
  if (_callback) {
    _callback(@[error.localizedDescription ?: @"Unknown error"]);
    _callback = nil;
  }
  // These connections are started on the main thread, so we shouldn't have to worry about multiple
  // connections trying to remove themselves all at once.
  [_requestManager removeConnection:_connectionID];
}

@end
