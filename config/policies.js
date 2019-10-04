/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  "*": false,
  // user
  "user/register": true,
  "user/login": true,

  // profile
  "profile/*": "isLoggedIn",
  "profile/getprofilebyhandle": true,
  "profile/getprofilebyid": true,
  "profile/getallprofile": true,

  //post
  "post/*": "isLoggedIn",
  "post/getallpost": true,
  "post/getpostbyid": true,

  welcome: true
};
