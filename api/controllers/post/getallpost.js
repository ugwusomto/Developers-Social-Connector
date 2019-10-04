// @Route /api/v1/post @Method GET
// @Description Crate a post
// @Access Public

module.exports = async function getallpost(req, res) {
  // fetch all post
  const post = await Post.find().sort("createdAt DESC");
  // check if post was returned
  if (!post) {
    return res.status(404).json({ message: "There is no post for now" });
  }

  return res.json(post);
};
