const isLoggedIn = (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect("/login");
  }
};

module.exports = { isLoggedIn };
