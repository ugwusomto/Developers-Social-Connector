// @Description --- This file contains the method required to handle json web token

const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_OR_KEY;

module.exports = {
  // @Desc -- signs users data JWT TOKER
  // @Return -- Return the token
  sign: function(payload) {
    const token = jwt.sign(payload, secretKey, {
      expiresIn: "1d"
    });

    return token;
  },
  verify: function(token, callback) {
    jwt.verify(token, secretKey, callback);
  }
};
