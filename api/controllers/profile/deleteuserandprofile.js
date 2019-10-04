// @Route /api/v1/profile/experience/:id   @Method DELETE
// @Description Delete user experience
// @Access Private

module.exports = async function deleteuserandprofile(req, res) {
  const profile = await Profile.destroyOne({ user: req.user.id });

  if (!profile) {
    return res.status(404).json({ error: "Profile doesnot exist" });
  }

  const user = await User.destroyOne({ id: req.user.id });

  if (!user) {
    return res.status(404).json({ error: "User doesnot exist" });
  }

  return res.json(user);
};
