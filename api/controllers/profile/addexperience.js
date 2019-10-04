// @Route /api/v1/profile/experience   @Method POST
// @Description Add user experience
// @Access Private

module.exports = async function addexperience(req, res) {
  // get all the required parameter from the form body
  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = req.allParams();

  // validate profile
  const validator = validateForm.validateExperience({ title, company, from });

  if (typeof validator == "object") {
    return res.status(400).json(validator);
  }

  // set current to false if it wasnt specified
  // if (!current) {
  //   current = false;
  // }

  // find user profile
  const profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    return res.status(404).json({ noprofile: "There seem to be no profile " });
  }

  const newCurr = !current ? false : current;
  // create object
  const newExe = {
    title,
    company,
    location,
    from,
    to,
    current: newCurr,
    description
  };

  // Set the new profile property
  if (profile.experience == null) {
    profile.experience = {};
    newExe.id = 0;
    profile.experience[0] = newExe;
  } else {
    const key = Object.keys(profile.experience).length;
    newExe.id = key;
    profile.experience[key] = newExe;
  }

  // update the profile property
  const updated_profile = await Profile.updateOne({ user: req.user.id }).set({
    experience: profile.experience
  });

  if (!updated_profile) {
    return res.status(424).json({
      error: "Something failed while trying to update the profile experience"
    });
  }

  return res.json(updated_profile);
};
