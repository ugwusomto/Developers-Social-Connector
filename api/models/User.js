// @description This is the schema of the user model
// @userinfo fullname,email,password,picture
module.exports = {
  tableName: "user",
  attributes: {
    fullname: {
      type: "string",
      required: true
    },
    email: {
      type: "string",
      required: true
    },
    password: {
      type: "string",
      required: true,
      encrypt: true
    },
    picture: {
      type: "string"
    },
    profile: {
      collection: "profile",
      via: "user"
    },
    post: {
      collection: "post",
      via: "user"
    }
  }
};
