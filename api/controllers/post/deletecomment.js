// @Route /api/v1/post/comment/:post_id/:comment_id   @Method DELETE
// @Description Add post comment
// @Access Private

module.exports = async function deletecomment(req, res) {
  // get all the required parameter from the form body
  const { post_id, comment_id } = req.allParams();

  // validate id
  if (!comment_id) {
    return res.status(404).json({ error: "Invalid comment id" });
  }

  // validate id
  if (!post_id) {
    return res.status(404).json({ error: "Invalid post id" });
  }

  // validate id
  if (isNaN(parseInt(comment_id))) {
    return res.status(404).json({ error: "Invalid comment id" });
  }

  // find post
  const post = await Post.findOne({ id: post_id });

  if (!post) {
    return res
      .status(404)
      .json({ nopost: "There seem to be no post with this id " });
  }

  // delete the object
  if (
    post.comments[comment_id] &&
    post.comments[comment_id].user === req.user.id
  ) {
    // delete the expience
    delete post.comments[comment_id];
  } else {
    return res.status(422).json({ error: "The comment detail does not exist" });
  }

  // update the comments property
  const updated_comments = await Post.updateOne({ id: post_id }).set({
    comments: post.comments
  });

  if (!updated_comments) {
    return res.status(424).json({
      error: "Something failed while trying to delete the post comments"
    });
  }

  return res.json(updated_comments);
};
