const redirectLoggedIn = (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect('/login');
  }
};

const isLoggedIn = (req, res) => {
  if (!req.session.currentUser) {
    return false;
  }
  return true;
};

module.exports = {redirectLoggedIn, isLoggedIn};
