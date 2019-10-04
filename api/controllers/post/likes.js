// @Route /api/v1/post/like/:id   @Method Post
// @Description Update post likes
// @Access Private

module.exports = async function likes(req, res) {
  const id = req.param("id");

  // search for post
  const post = await Post.findOne({ id: id });

  if (!post) {
    return res.status(404).json({ nopost: "There is no post with this id" });
  }

  //   Set user id
  const user_id = req.user.id;

  //   Set Post likes
  if (post.likes === null) {
    post.likes = {};
    post.likes[user_id] = true;
  } else {
    if (!post.likes[user_id]) {
      post.likes[user_id] = true;
    } else {
      return res
        .status(400)
        .json({ alreadyliked: "You have already liked this post" });
    }
  }

  // update the post likes
  const updated_post = await Post.updateOne({ id: id }).set({
    likes: post.likes
  });

  return res.json(updated_post);
};
