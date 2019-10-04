// @Route /api/v1/post/comment/:id  @Method POST
// @Description Add post comment
// @Access Private

module.exports = async function addcomment(req, res) {
  // get all the required parameter from the form body
  const { text, name, avatar, date, id } = req.allParams();

  // validate profile
  const validator = validateForm.validateCreatePost({ text });

  if (typeof validator == "object") {
    return res.status(400).json(validator);
  }

  // find post
  const post = await Post.findOne({ id: id });

  if (!post) {
    return res
      .status(404)
      .json({ nopost: "There seem to be no post with this id " });
  }

  // create object
  const newComment = {
    text,
    name,
    avatar,
    date,
    id: id,
    user: req.user.id
  };

  // Set the new post
  if (post.comments == null) {
    post.comments = {};
    post.comments[0] = newComment;
  } else {
    const key = Object.keys(post.comments).length;
    post.comments[key] = newComment;
  }

  // update the comments property
  const updated_comments = await Post.updateOne({ id: id }).set({
    comments: post.comments
  });

  if (!updated_comments) {
    return res.status(424).json({
      error: "Something failed while trying to update the post comments"
    });
  }

  return res.json(updated_comments);
};
