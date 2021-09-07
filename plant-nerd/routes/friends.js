const express = require('express');
const router = express.Router();
const {redirectLoggedIn} = require('./guards/guards');
const User = require('../models/user.model');

router.get('/findFriends', redirectLoggedIn, (req, res) => {
  User.find().then((users) => {
    res.render('insidePlants/friends', {
      users: users,
    });
  });
});

router.post('/addFriend/:id', redirectLoggedIn, (req, res) => {
  const friendId = req.params.id;
  const userId = req.session.currentUser._id;

  User.findByIdAndUpdate(friendId, {$push: {friends: userId}})
    .then(() => {
      return User.findByIdAndUpdate(userId, {$push: {friends: friendId}});
    })
    .then(() => {
      res.redirect('/findFriends');
    });
});

router.post('/friendSearch', (req, res) => {
  const {searchFriend} = req.body;

  User.find({username: {$regex: searchFriend, $options: 'i'}}).then((users) => {
    res.render('insidePlants/searchFriends', {
      users: users,
    });
  });
});

module.exports = router;
