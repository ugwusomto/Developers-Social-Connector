// @Route /api/v1/profile/education   @Method POST
// @Description Add user education
// @Access Private

module.exports = async function addeducation(req, res) {
  // get all the required parameter from the form body
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = req.allParams();

  // validate profile
  const validator = validateForm.validateEducation({
    school,
    degree,
    fieldofstudy,
    from
  });

  if (typeof validator == "object") {
    return res.status(400).json(validator);
  }

  // find user profile
  const profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    return res.status(404).json({ noprofile: "There seem to be no profile " });
  }

  const newCurr = !current ? false : current;
  // create object
  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  };

  // Set the new profile property
  if (profile.education == null) {
    profile.education = {};
    newEdu.id = 0;
    profile.education[0] = newEdu;
  } else {
    const key = Object.keys(profile.education).length;
    newEdu.id = key;
    profile.education[key] = newEdu;
  }

  // update the profile property
  const updated_profile = await Profile.updateOne({ user: req.user.id }).set({
    education: profile.education
  });

  if (!updated_profile) {
    return res.status(424).json({
      error: "Something failed while trying to update the profile education"
    });
  }

  return res.json(updated_profile);
};
