// @Route /api/v1/post/:id   @Method DELETE
// @Description Delete post
// @Access Private

module.exports = async function deletepost(req, res) {
  // get  the required parameter from the form body
  const id = req.param("id");

  // find post
  const post = await Post.findOne({ id: id });

  if (!post) {
    return res
      .status(404)
      .json({ nopost: "There seem to be no post with this id" });
  }

  // check if it is the user that owns the post
  if (post.user.toString() !== req.user.id) {
    return res
      .status(401)
      .json({ postdelete: "Unauthorized user trying to delete post" });
  }

  // delete post
  const postdeleted = await Post.destroyOne({ id: id });

  if (!postdeleted) {
    return res.status(404).json({
      postdelete: "Something went wrong while trying to delete the post"
    });
  }

  return res.json({ success: true });
};
