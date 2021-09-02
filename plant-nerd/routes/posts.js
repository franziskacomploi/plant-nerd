const express = require('express');
const router = express.Router();
const {redirectLoggedIn} = require('./guards/guards');

const Plant = require('../models/plant.model');

router.get('/user/my-posts', redirectLoggedIn, (req, res) => {
  const userID = req.session.currentUser._id;
  Plant.find({author: userID})
    .then((posts) => {
      res.render('insidePlants/posts/userPosts', {
        posts: posts,
      });
    })
    .catch((error) =>
      console.log(`Error while searching for user posts: ${error}`)
    );
});

router.post('/deletePost/:id', redirectLoggedIn, (req, res, next) => {
  const id = req.params.id;
  Plant.findByIdAndDelete(id)
    .then(res.redirect('/user/my-posts'))
    .catch((err) => {
      console.log('Error occured while deleting the plant', err);
    });
});

module.exports = router;
