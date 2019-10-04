// This controller handles the welcome request

module.exports = async function welcome(req, res) {
  return res.json(req.user);
};
