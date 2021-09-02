const express = require('express');
const router = express.Router();
const {redirectLoggedIn} = require('./guards/guards');

const Plant = require('../models/plant.model');

router.get('/user/my-posts', redirectLoggedIn, (req, res) => {
  const userID = req.session.currentUser._id;
  Plant.find({author: userID})
    .then((posts) => {
      res.render('insidePlants/userPosts', {
        posts: posts,
      });
    })
    .catch((error) =>
      console.log(`Error while searching for user posts: ${error}`)
    );
});

module.exports = router;
