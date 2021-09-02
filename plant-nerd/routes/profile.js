const express = require('express');
const router = express.Router();
const {redirectLoggedIn} = require('./guards/guards');

const User = require('../models/User.model');

router.get('/profile', redirectLoggedIn, (req, res) => {
  res.render('insidePlants/profile', {userInSession: req.session.currentUser});
});

router.get('/deleteProfile', redirectLoggedIn, (req, res) => {
  res.render('insidePlants/deleteProfile', {
    userInSession: req.session.currentUser,
  });
});

router.post('/deleteProfile/:id', redirectLoggedIn, (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id).then(() => {
    req.session.destroy();
    res.render('main');
  });
});

module.exports = router;
