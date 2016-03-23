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

@implementation RCTConvert (RCTFBSDKGraphRequest)

+ (FBSDKGraphRequest *)FBSDKGraphRequest:(id)json
{
  NSDictionary *requestDict = [RCTConvert NSDictionary:json];
  NSDictionary *config = requestDict[@"config"];
  NSString *tokenString = [RCTConvert NSString:RCTNilIfNull(config[@"accessToken"])] ?: [FBSDKAccessToken currentAccessToken].tokenString;
  NSDictionary *parameters = RCTPrepareParameters([RCTConvert NSDictionary:RCTNilIfNull(config[@"parameters"])]) ?: [[NSDictionary alloc] init];
  NSString *version = [RCTConvert NSString:RCTNilIfNull(config[@"version"])];
  NSString *method = [RCTConvert NSString:RCTNilIfNull(config[@"httpMethod"])];
  FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
          initWithGraphPath:[RCTConvert NSString:RCTNilIfNull(requestDict[@"graphPath"])]
          parameters:parameters
          tokenString:tokenString
          version:version
          HTTPMethod:method];
  return request;
}

#pragma mark - Helper Functions

static NSDictionary *RCTPrepareParameters(NSDictionary *parameters)
{
  NSMutableDictionary *preparedParameters = [[NSMutableDictionary alloc] init];
  for (NSString *key in parameters.allKeys) {
    NSDictionary *object = [RCTConvert NSDictionary:RCTNilIfNull(parameters[key])];
    preparedParameters[key] = [RCTConvert NSString:object[@"string"]];
  }
  return preparedParameters;
}

@end

@implementation RCTFBSDKGraphRequestManager
{
  FBSDKGraphRequestConnection *_connection;
  RCTResponseSenderBlock _connectionCallback;
}

RCT_EXPORT_MODULE(FBGraphRequest);

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

#pragma mark - React Native Methods

RCT_EXPORT_METHOD(addToConnection:(FBSDKGraphRequest *)request callback:(RCTResponseSenderBlock)callback)
{
  if (_connection == nil) {
    _connection = [[FBSDKGraphRequestConnection alloc] init];
    _connection.delegate = self;
  }
  FBSDKGraphRequestHandler completionHandler = ^(FBSDKGraphRequestConnection *connection, id result, NSError *error) {
    NSDictionary *errorDict = error ? RCTJSErrorFromNSError(error) : nil;
    callback(@[RCTNullIfNil(errorDict), RCTNullIfNil(result)]);
  };
  [_connection addRequest:request completionHandler:completionHandler];
}

RCT_REMAP_METHOD(addBatchCallback, addConnectionCallback:(RCTResponseSenderBlock)callback)
{
  _connectionCallback = callback;
}

RCT_EXPORT_METHOD(start:(nonnull NSNumber *)timeout)
{
  if (_connection != nil) {
    [_connection start];
  } else {
    RCTLogError(@"No connection found");
  }
}

#pragma mark - FBSDKGraphRequestConnectionDelegate

- (void)requestConnectionDidFinishLoading:(FBSDKGraphRequestConnection *)connection
{
  if (_connectionCallback) {
    _connectionCallback(@[[NSNull null], @{@"result": @"success"}]);
    _connectionCallback = nil;
  }
  _connection = nil;
}

- (void)requestConnection:(FBSDKGraphRequestConnection *)connection didFailWithError:(NSError *)error
{
  if (_connectionCallback) {
    _connectionCallback(@[error.localizedDescription ?: @"Unknown error", [NSNull null]]);
    _connectionCallback = nil;
  }
  _connection = nil;
}

@end
