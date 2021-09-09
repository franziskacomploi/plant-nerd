const redirectLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/login');
  }
  next();
};

const isLoggedIn = (req, res) => {
  if (!req.session.currentUser) {
    return false;
  }
  return true;
};

module.exports = {redirectLoggedIn, isLoggedIn};
