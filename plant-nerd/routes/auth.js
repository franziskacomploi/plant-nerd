const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const fileUploader = require('../configs/cloudinary.config');

const bcryptjs = require('bcryptjs');
const saltRounds = 10;



const User = require('../models/User.model');

// SIGN UP

router.get('/signup', (req, res) => res.render('auth/signup'));

router.post('/signup', fileUploader.single('profilePic'), (req, res, next) => {



  console.log("post something")
  const {username, password, description, favPlant, birthday, firstName} =
    req.body;

  if (!username || !password) {
    res.render('auth/signup', {
      errorMessage: 'You need a username and a password to join.',
    });
    return;
  }


  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        username,
        password: hashedPassword,
        profilePic: req.file ?  req.file.path :"https://tse1.mm.bing.net/th?id=OIP.IV4duzHKytfRSOSywgprAgHaJ-&pid=Api" ,
        description,
        favPlant,
        birthday,
        firstName,
      });
    })
    .then((userFromDB) => {
      console.log('Newly created user is: ', userFromDB);
      res.redirect('/');
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render('auth/signup', {errorMessage: error.message});
      } else if (error.code === 11000) {
        res.status(500).render('auth/signup', {
          errorMessage: 'Every leaf is unique and so should be your username.',
        });
      }
    });
});

// LOG IN

router.get('/login', (req, res) => res.render('auth/login'));

router.post('/login', (req, res, next) => {
  console.log('SESSION =====> ', req.session);

  const {username, password} = req.body;

  if (username === '' || password === '') {
    res.render('auth/login', {
      errorMessage: 'Please enter username and password to login.',
    });
    return;
  }

  User.findOne({username})
    .then((user) => {
      if (!user) {
        res.render('auth/login', {
          errorMessage: "We can't find this username.",
        });
        return;
      } else if (bcryptjs.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.redirect('insidePlants/plantsMain');
      } else {
        res.render('auth/login', {errorMessage: 'Incorrect password.'});
      }
    })
    .catch((error) => next(error));
});

router.get('/plantsMain', (req, res) => {
  res.render('insidePlants/plantsMain', {
    userInSession: req.session.currentUser,
  });
});

// LOG OUT

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
