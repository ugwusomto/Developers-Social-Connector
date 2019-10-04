// @Route /api/v1/profile   @Method GET
// @Description Get current user profile
// @Access Private

module.exports = async function getprofile(req, res) {
  // fetch the user with such profile

  const profile = await Profile.findOne({ user: req.user.id }).populate("user");

  if (!profile) {
    return res.status(404).json({ noprofile: "This user has no profile" });
  }

  return res.json(profile);
};
