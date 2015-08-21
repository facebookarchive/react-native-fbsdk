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

#import "RCTFBSDKGraphRequestManager.h"

#import <RCTConvert.h>
#import <RCTUtils.h>

#import "RCTFBSDKGraphRequestConnectionContainer.h"

@implementation RCTConvert (RCTFBSDKGraphRequest)

+ (FBSDKGraphRequest *)FBSDKGraphRequest:(id)json
{
  NSDictionary *requestDict = [RCTConvert NSDictionary:json];
  NSString *tokenString = [RCTConvert NSString:requestDict[@"tokenString"]] ?: [FBSDKAccessToken currentAccessToken].tokenString;
  FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
          initWithGraphPath:[RCTConvert NSString:requestDict[@"graphPath"]]
          parameters:RCTPrepareParameters([RCTConvert NSDictionary:requestDict[@"parameters"]])
          tokenString:tokenString
          version:[RCTConvert NSString:requestDict[@"version"]]
          HTTPMethod:[RCTConvert NSString:requestDict[@"HTTPMethod"]]];
  [request setGraphErrorRecoveryDisabled:[RCTConvert BOOL:requestDict[@"graphErrorRecoveryDisabled"]]];
  return request;
}

#pragma mark - Helper Functions

static NSDictionary *RCTPrepareParameters(NSDictionary *parameters)
{
  NSMutableDictionary *preparedParameters = [[NSMutableDictionary alloc] init];
  for (NSString *key in parameters.allKeys) {
    NSDictionary *object = [RCTConvert NSDictionary:parameters[key]];
    if (object[@"string"]) {
      preparedParameters[key] = [RCTConvert NSString:object[@"string"]];
    } else if (object[@"uri"]) {
      NSURL *url = [RCTConvert NSURL:object[@"uri"]];
      preparedParameters[key] = [NSData dataWithContentsOfURL:url];
    }
  }
  return preparedParameters;
}

@end

@implementation RCTFBSDKGraphRequestManager
{
  NSMutableDictionary *_activeConnections;
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
    _activeConnections = [[NSMutableDictionary alloc] init];
  }
  return self;
}

#pragma mark - Instance Methods

- (void)removeConnection:(NSString *)connectionID
{
  [_activeConnections removeObjectForKey:connectionID];
}

#pragma mark - React Native Methods

RCT_EXPORT_METHOD(addConnection:(RCTResponseSenderBlock)callback)
{
  // Find the smallest unique ID for this connection
  NSUInteger potentialID = 0;
  NSNumber *connectionID;
  do {
    connectionID = @(potentialID++);
  } while (_activeConnections[connectionID]);
  RCTFBSDKGraphRequestConnectionContainer *connectionContainer = [[RCTFBSDKGraphRequestConnectionContainer alloc] initWithRequestManager:self connectionID:connectionID];
  _activeConnections[connectionID] = connectionContainer;
  callback(@[connectionID]);
}

RCT_EXPORT_METHOD(addRequestToConnection:(nonnull NSNumber *)connectionID request:(FBSDKGraphRequest *)request batchParameters:(NSDictionary *)batchParameters callback:(RCTResponseSenderBlock)callback)
{
  RCTFBSDKGraphRequestConnectionContainer *connectionContainer = _activeConnections[connectionID];
  if (connectionContainer) {
    FBSDKGraphRequestHandler completionHandler = ^(FBSDKGraphRequestConnection *connection, id result, NSError *error) {
      NSDictionary *errorDict = error ? RCTJSErrorFromNSError(error) : nil;
      callback(@[RCTNullIfNil(errorDict), RCTNullIfNil(result)]);
    };
    [connectionContainer.connection addRequest:request completionHandler:completionHandler batchParameters:batchParameters];
  } else {
    RCTLogError(@"No connection with ID %@ found", connectionID);
  }
}

RCT_EXPORT_METHOD(startConnection:(nonnull NSNumber *)connectionID timeout:(nonnull NSNumber *)timeout callback:(RCTResponseSenderBlock)callback)
{
  RCTFBSDKGraphRequestConnectionContainer *connectionContainer = _activeConnections[connectionID];
  if (connectionContainer) {
    connectionContainer.callback = callback;
    if (timeout) {
      connectionContainer.connection.timeout = timeout.doubleValue;
    }
    [connectionContainer.connection start];
  } else {
    RCTLogError(@"No connection with ID %@ found", connectionID);
  }
}

@end
