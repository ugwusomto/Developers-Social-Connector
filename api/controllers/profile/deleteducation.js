// @Route /api/v1/profile/education/:id   @Method DELETE
// @Description Delete user education
// @Access Private

module.exports = async function deleteducation(req, res) {
  // get all the required parameter from the form body
  const id = req.param("edu_id");

  // validate id
  if (!id) {
    return res.status(404).json({ error: "Invalid education id" });
  }
  // validate id
  if (isNaN(parseInt(id))) {
    return res.status(404).json({ error: "Invalid education id" });
  }

  // find user profile
  const profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    return res.status(404).json({ noprofile: "There seem to be no profile" });
  }

  // delete the object
  if (profile.education[id]) {
    // delete the expience
    delete profile.education[id];
  } else {
    return res
      .status(422)
      .json({ error: "The education detail does not exist" });
  }

  // update the profile property
  const updated_profile = await Profile.updateOne({ user: req.user.id }).set({
    education: profile.education
  });

  if (!updated_profile) {
    return res.status(424).json({
      error: "Something failed while trying to delete the profile education"
    });
  }

  return res.json(updated_profile);
};
