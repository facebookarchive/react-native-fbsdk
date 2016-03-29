/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to use,
 * copy, modify, and distribute this software in source code or binary form for use
 * in connection with the web services and APIs provided by Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use of
 * this software is subject to the Facebook Developer Principles and Policies
 * [http://developers.facebook.com/policy/]. This copyright notice shall be
 * included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */

'use strict';

type ActionType =
  // The user is sending an object to their friends.
  'send' |
  // The user is asking for an object from friends.
  'askfor' |
  // It is the turn of the friends to play against the user in a match.
  'turn';
type Filters =
  // Friends using the app can be displayed.
  'app_users' |
  // Friends not using the app can be displayed.
  'app_non_users';

/**
 * A model for a game request.
 */
export type GameRequestContent = {
  /**
   * A plain-text message to be sent as part of the request.  Required.
   */
  message: string;

  /**
   * Used when defining additional context about the nature of the request.
   * The parameter 'objectID' is required if the action type is either 'send' or 'ask-for'.
   */
  actionType?: ActionType;

  /**
   * Additional freeform data you may pass for tracking. The maximum length is 255 characters.
   */
  data?: string;

  /**
   * Controls the set of friends someone sees if a multi-friend selector is shown.
   */
  filters?: Filters;

  /**
   * The Open Graph object ID of the object being sent/asked for. This cannot be null for ActionType SEND and ASKFOR.
   */
  objectId?: string;

  /**
   * An array of user IDs, usernames or invite tokens of people to send requests to.
   */
  recipients?: Array<string>;

  /**
   * An array of user IDs that will be included in the dialog as the first suggested friends.
   * Can't be used together with filters.
   */
  suggestions?: Array<string>;

  /**
   * The title for the dialog.
   */
  title?: string;
};
