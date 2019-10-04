// @Route /api/v1/post/create
// @Description Crate a post
// @Access Private

module.exports = async function create(req, res) {
  // extract the required data
  const { text, name, avatar } = req.allParams();

  const validator = validateForm.validateCreatePost({ text });

  if (typeof validator == "object") {
    return res.status(400).json(validator);
  }

  // insert into the post
  const post = await Post.create({
    text,
    name,
    avatar,
    user: req.user.id
  }).fetch();

  // check if user was returned
  if (!post) {
    return res
      .status(404)
      .json({ message: "Something went wrong while posting" });
  }

  return res.json(post);
};
