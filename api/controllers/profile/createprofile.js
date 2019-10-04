// @Route /api/v1/profile @METHOD POST
// @Description Create user profile
// @Access Private

module.exports = async function createprofile(req, res) {
  // extract the data

  const {
    skills,
    handle,
    company,
    location,
    status,
    bio,
    githubusername,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
    website
  } = req.allParams();

  // validate the required once
  const validator = validateForm.validateCreateProfile({
    handle,
    skills,
    status,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
    website
  });

  if (typeof validator == "object") {
    return res.status(400).json(validator);
  }

  // set the profile object
  const profileFields = {};
  //  profileFields.experience = {};
  //  profileFields.education = {};
  profileFields.social = {};

  // collect all the details
  if (website) profileFields.website = website;
  if (handle) profileFields.handle = handle;
  if (company) profileFields.company = company;
  if (location) profileFields.location = location;
  if (status) profileFields.status = status;
  if (bio) profileFields.bio = bio;
  if (skills) profileFields.skills = skills;
  if (githubusername) profileFields.githubusername = githubusername;
  if (youtube) profileFields.social.youtube = youtube;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (twitter) profileFields.social.twitter = twitter;
  if (instagram) profileFields.social.instagram = instagram;
  if (facebook) profileFields.social.facebook = facebook;

  // search  for the user
  let profile = await Profile.findOne({ user: req.user.id }).populate("user");

  if (profile) {
    // update the data and return

    // Q&A what if he changes his handler
    try {
      profile = await Profile.updateOne({ user: req.user.id }).set(
        profileFields
      );
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
    return res.json(profile);
  }

  // Check if a user with a handler exist

  const handler = await Profile.findOne({ handle: handle }).populate("user");

  if (handler) {
    return res.status(400).json({ error: "This handle already exists" });
  }

  //  create a new user
  const newProfile = await Profile.create({
    user: req.user.id,
    ...profileFields
  }).fetch();

  if (newProfile) {
    return res.json(newProfile);
  }
};
