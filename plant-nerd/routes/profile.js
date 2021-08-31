const express = require('express');
const router = express.Router();
const {redirectLoggedIn} = require('./guards/guards');

const User = require('../models/User.model');
const Plant = reuqire('../models/plant.model');

router.get('/profile', (req, res) => {
  res.render('insidePlants/profile', {userInSession: req.session.currentUser});
});

router.get('/deleteProfile', (req, res) => {
  res.render('insidePlants/deleteProfile', {
    userInSession: req.session.currentUser,
  });
});

router.post('/deleteProfile/:id/delete', (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id).then(() => {
    req.session.destroy();
    res.render('main');
  });
});

router.get('/user/my-posts', redirectLoggedIn, (req, res) => {
  const userID = req.session.currentUser._id;
  Plant.find;
});

module.exports = router;
