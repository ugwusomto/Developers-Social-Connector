// @Route /api/v1/post/unlike/:id   @Method Post
// @Description Update post unlikes
// @Access Private

module.exports = async function unlikes(req, res) {
  const id = req.param("id");

  // search for post
  const post = await Post.findOne({ id: id });

  if (!post) {
    return res.status(404).json({ nopost: "There is no post with this id" });
  }

  //   Set user id
  const user_id = req.user.id;

  //   Set Post likes
  if (post.likes === null || post.likes[user_id] == "undefined") {
    return res
      .status(400)
      .json({ alreadyliked: "You have not liked this post" });
  } else {
    delete post.likes[user_id];
  }

  // update the post likes
  const updated_post = await Post.updateOne({ id: id }).set({
    likes: post.likes
  });

  return res.json(updated_post);
};
