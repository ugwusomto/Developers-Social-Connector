/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  "/": { action: "welcome" },
  "GET /api/v1/:handle": { action: "profile/getprofilebyhandle" },
  "GET /api/v1/profile": { action: "profile/getprofile" },
  "GET /api/v1/profile/user/:user_id": { action: "profile/getprofilebyid" },
  "GET /api/v1/profile/all": { action: "profile/getallprofile" },
  "GET /api/v1/post": { action: "post/getallpost" },
  "GET /api/v1/post/:id": { action: "post/getpostbyid" },

  "POST /api/v1/user/register": { action: "user/register" },
  "POST /api/v1/user/login": { action: "user/login" },
  "POST /api/v1/profile/experience": { action: "profile/addexperience" },
  "POST /api/v1/profile/education": { action: "profile/addeducation" },
  "POST /api/v1/profile": { action: "profile/createprofile" },
  "POST /api/v1/post/create": { action: "post/create" },
  "POST /api/v1/post/likes/:id": { action: "post/likes" },
  "POST /api/v1/post/unlikes/:id": { action: "post/unlikes" },
  "POST /api/v1/post/comment/:id": { action: "post/addcomment" },

  "DELETE /api/v1/profile/experience/:exp_id": {
    action: "profile/deletexperience"
  },
  "DELETE /api/v1/profile/education/:edu_id": {
    action: "profile/deleteducation"
  },
  "DELETE /api/v1/profile": {
    action: "profile/deleteuserandprofile"
  },
  "DELETE /api/v1/post/:id": {
    action: "post/deletepost"
  },
  "DELETE /api/v1/post/comment/:post_id/:comment_id": {
    action: "post/deletecomment"
  }
};
