// @Route /api/v1/profile/all   @Method GET
// @Description Get all user
// @Access Public

module.exports = async function getallprofile(req, res) {
  // select all profile

  const app_profile = await Profile.find({}).populate("user");

  if (!app_profile) {
    res.status(404).json({ noprofile: "There are no profile" });
  }

  return res.json(app_profile);
};
