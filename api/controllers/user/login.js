// @Route /api/v1/user/login
// @Description User login
// @Access Public

module.exports = async function login(req, res) {
  // extract the required data
  const { email, password } = req.allParams();

  const validator = validateForm.validateLogin({ email, password });

  if (typeof validator == "object") {
    return res.status(400).json(validator);
  }

  // search form the user trying to log in with the email
  const user = await User.findOne({ email }).decrypt();

  // check if user was returned
  if (!user) {
    return res.status(404).json({ message: "Invalid login details" });
  }

  // check password match
  if (password != user.password) {
    return res.status(404).json({ message: "Invalid login details" });
  }

  // set up the payload for JWT
  const payload = {
    id: user.id,
    fullname: user.fullname,
    email: user.email,
    picture: user.picture
  };

  // get the token
  const token = await jwtToken.sign(payload);

  return res.json({ success: true, token: "Bearer " + token });
};
