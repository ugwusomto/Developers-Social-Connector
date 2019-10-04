// @Route /api/v1/profile/handle   @Method GET
// @Description Get current user profile by handle
// @Access Public

module.exports = async function getprofilebyhandle(req, res) {
  const handle = req.param("handle");

  const profile = await Profile.findOne({ handle }).populate("user");

  if (!profile) {
    return res
      .status(404)
      .json({ noprofile: "There is no profile for this user" });
  }

  return res.json(profile);
};
