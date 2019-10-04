// @Route /api/v1/profile/experience/:id   @Method DELETE
// @Description Delete user experience
// @Access Private

module.exports = async function deletexperience(req, res) {
  // get all the required parameter from the form body
  const id = req.param("exp_id");

  if (!id) {
    return res.status(404).json({ error: "Invalid experience id" });
  }

  // validate id
  if (isNaN(parseInt(id))) {
    return res.status(404).json({ error: "Invalid experience id" });
  }

  // find user profile
  const profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    return res.status(404).json({ noprofile: "There seem to be no profile" });
  }

  // delete the object
  if (profile.experience[id]) {
    // delete the expience
    delete profile.experience[id];
  } else {
    return res.status(422).json({ error: "The experience does not exist" });
  }

  // update the profile property
  const updated_profile = await Profile.updateOne({ user: req.user.id }).set({
    experience: profile.experience
  });

  if (!updated_profile) {
    return res.status(424).json({
      error: "Something failed while trying to delete the profile experience"
    });
  }

  return res.json(updated_profile);
};
