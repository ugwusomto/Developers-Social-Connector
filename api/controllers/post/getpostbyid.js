// @Route /api/v1/post/:id   @Method GET
// @Description Get current post by id
// @Access Public

module.exports = async function getpostbyid(req, res) {
  const id = req.param("id");

  const post = await Post.findOne({ id: id }).populate("user");

  if (!post) {
    return res.status(404).json({ nopost: "There is no post with this id " });
  }

  return res.json(post);
};
