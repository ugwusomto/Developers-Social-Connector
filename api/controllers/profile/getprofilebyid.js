// @Route /api/v1/profile/user/:user_id   @Method GET
// @Description Get current user profile by id
// @Access Public

module.exports = async function getprofilebyid(req, res) {
  const user_id = req.param("user_id");

  const profile = await Profile.findOne({ user: user_id }).populate("user");

  if (!profile) {
    return res
      .status(404)
      .json({ noprofile: "There is no profile for this user" });
  }

  return res.json(profile);
};
