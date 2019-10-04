// @Route   --  /api/v1/user/register
// @Description -- Register user
// @Access -- Public access

module.exports = async function register(req, res) {
  // Extract the users data
  const { fullname, email, password, picture } = req.allParams();

  // validate  data
  // This returns error message after validation
  const validator = await validateForm.validateSignup({
    fullname,
    email,
    password,
    picture
  });

  if (typeof validator == "object") {
    return res.badRequest(validator);
  }

  //check if the email exists
  let user = await User.findOne({ email: email });

  if (user) {
    return res.badRequest({ email: "Email already exists" });
  }

  // process user create
  // @Dont forget to catch errors
  user = await User.create({ fullname, email, password, picture })
    .intercept("UsageError", () => {
      res.status(400);
      return res.json({ message: "Invalid form details" });
    })
    .fetch();

  // respond to the user
  if (user) {
    return res.json(user);
  }
};
