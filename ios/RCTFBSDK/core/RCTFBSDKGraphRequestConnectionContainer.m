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

#import <React/RCTConvert.h>
#import <React/RCTUtils.h>

#pragma mark - Helper Functions

static NSMutableArray *g_pendingConnection;

static NSDictionary *RCTPrepareParameters(NSDictionary *parameters)
{
  NSMutableDictionary *preparedParameters = [[NSMutableDictionary alloc] init];
  for (NSString *key in parameters.allKeys) {
    NSDictionary *object = [RCTConvert NSDictionary:parameters[key]];
    preparedParameters[key] = [RCTConvert NSString:object[@"string"]];
  }
  return preparedParameters;
}

static NSArray<FBSDKGraphRequest *> *FBSDKGraphRequestArray(id json)
{
  NSArray *requestArray = [RCTConvert NSArray:json];
  NSMutableArray *requests = [[NSMutableArray alloc] init];
  for(int i = 0; i < [requestArray count]; i++) {
    NSDictionary *requestDict = [RCTConvert NSDictionary:requestArray[i]];
    NSDictionary *config = [RCTConvert NSDictionary:requestDict[@"config"]];
    NSString *tokenString = [RCTConvert NSString:config[@"accessToken"]]?: [FBSDKAccessToken currentAccessToken].tokenString;
    NSDictionary *parameters = RCTPrepareParameters([RCTConvert NSDictionary:config[@"parameters"]]);
    NSString *version = [RCTConvert NSString:config[@"version"]];
    NSString *method = [RCTConvert NSString:config[@"httpMethod"]];
    FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc] initWithGraphPath:[RCTConvert NSString:(requestDict[@"graphPath"])]
                                                                   parameters:parameters
                                                                  tokenString:tokenString
                                                                      version:version
                                                                   HTTPMethod:method];
    [requests addObject:request];
  }
  return requests;
}

#pragma mark - RCTFBSDKGraphRequestConnectionContainer

@implementation RCTFBSDKGraphRequestConnectionContainer
{
  NSArray<FBSDKGraphRequest *> *_requestBatch;
  RCTResponseSenderBlock _batchCallback;
  NSInteger _timeout;
  FBSDKGraphRequestConnection *_connection;
  NSMutableDictionary *_response;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

#pragma mark - Object Lifecycle
- (instancetype)initWithRequestBatch:(NSArray *)requestBatch
                             timeout:(NSInteger)timeout
                       batchCallback:(RCTResponseSenderBlock)callback
{
  if ((self = [super init])) {
    _connection = [[FBSDKGraphRequestConnection alloc] init];
    _connection.delegate = self;
    _requestBatch = FBSDKGraphRequestArray(requestBatch);
    _batchCallback = callback;
    _timeout = timeout;
    _response = [[NSMutableDictionary alloc] init];
  }
  return self;
}

- (void)start
{
  g_pendingConnection = [[NSMutableArray alloc] init];
  [g_pendingConnection addObject:self];
  for (int i = 0; i < _requestBatch.count; i++) {
    FBSDKGraphRequestHandler completionHandler = ^(FBSDKGraphRequestConnection *connection, id result, NSError *error) {
      NSDictionary *errorDict = error ? RCTJSErrorFromNSError(error) : nil;
      _response[[NSString stringWithFormat: @"%i", i]] = @[RCTNullIfNil(errorDict), RCTNullIfNil(result)];
    };
    [_connection addRequest:_requestBatch[i] completionHandler:completionHandler];
  }
  [_connection start];
}

#pragma mark - FBSDKGraphRequestConnectionDelegate

- (void)requestConnectionDidFinishLoading:(FBSDKGraphRequestConnection *)connection
{
  if (_batchCallback) {
    _batchCallback(@[[NSNull null], @{@"result": @"success"}, _response]);
  }
  [g_pendingConnection removeObject:self];
}

- (void)requestConnection:(FBSDKGraphRequestConnection *)connection didFailWithError:(NSError *)error
{
  if (_batchCallback) {
    NSDictionary *errorDict = error ? RCTJSErrorFromNSError(error) : nil;
    _batchCallback(@[@[RCTNullIfNil(errorDict)], [NSNull null], _response]);
  }
  [g_pendingConnection removeObject:self];
}

@end
