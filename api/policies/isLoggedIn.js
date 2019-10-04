// @Description --- This is the policy that checks if the user is logged into the application
// Before accessing a particular route

module.exports = function(req, res, proceed) {
  let token;

  // check if the authorization header is present
  if (req.headers && req.headers.authorization) {
    //  Get the details
    const details = req.headers.authorization.split(" ");

    // check if the key is valid
    if (details.length == 2) {
      // extract the credentials

      const scheme = details[0];
      const credentials = details[1];

      // Do a case sensitive search for Bearer
      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.status(401).json({ error: "Unauthorized error" });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized error" });
  }

  // validate token
  jwtToken.verify(token, function(err, decoded) {
    // return if it is an invalid token
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // sails.log(decoded);
    req.user = decoded;

    proceed();
  });
};
