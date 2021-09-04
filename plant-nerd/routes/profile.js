const express = require('express');
const router = express.Router();
const {redirectLoggedIn} = require('./guards/guards');
const fileUploader = require('../configs/cloudinary.config');

const User = require('../models/user.model');

router.get('/profile', redirectLoggedIn, (req, res) => {
  let d = new Date(req.session.currentUser.birthday);
  let getDate = d.getDate();
  let getMonth = d.getMonth() + 1;
  let getYear = d.getFullYear();
  let birthDate = `${getDate}.${getMonth}.${getYear}`;

  res.render('insidePlants/profile', {
    userInSession: req.session.currentUser,
    birthDate,
  });
});

// EDIT

router.get('/editProfile', redirectLoggedIn, (req, res) => {
  res.render('insidePlants/editProfile', {
    userInSession: req.session.currentUser,
  });
});

router.post(
  '/editProfile/:id/',
  fileUploader.single('profilePic'),
  (req, res) => {
    const id = req.params.id;
    console.log('mir ============>', req.file);
    const updatedUser = {
      description: req.body.description,
      favPlant: req.body.favPlant,
      firstName: req.body.firstName,
    };
    if (req.body.birthday) {
      updatedUser.birthday = req.body.birthday;
    }
    if (req.file) {
      updatedUser.profilePic = req.file.path;
    }

    User.findByIdAndUpdate(id, updatedUser, {new: true}).then(() => {
      req.session.reload(function (err) {
        res.render('insidePlants/saved');
      });
    });
  }
);

// DELETE

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
