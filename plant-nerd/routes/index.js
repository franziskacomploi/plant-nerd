const express = require('express');
const router = express.Router();
const {redirectLoggedIn} = require('./guards/guards');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('main');
});

router.get('/explore', redirectLoggedIn, (req, res, next) => {
  res.render('insidePlants/plantsMain', {
    userInSession: req.session.currentUser,
  });
});

module.exports = router;
