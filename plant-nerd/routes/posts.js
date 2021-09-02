const express = require('express');
const router = express.Router();
const fileUploader = require('../configs/cloudinary.config');
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

router.get('/editPost/:id', redirectLoggedIn, (req, res, next) => {
  const id = req.params.id;
  Plant.findById(id).then((plant) => {
    console.log(plant);
    res.render('insidePlants/posts/editPost', {
      plant: plant,
    });
  });
});

router.post(
  '/editPost/:id',
  fileUploader.single('plantImg'),
  redirectLoggedIn,
  (req, res, next) => {
    const id = req.params.id;
    const {name, description, location, date, season} = req.body;

    let updateValues = {
      name,
      description,
      location,
      date,
      season,
    };

    if (req.file) {
      updateValues.plantImg = req.file.path;
    }

    Plant.findByIdAndUpdate(id, updateValues)
      .then(() => {
        res.redirect('/user/my-posts');
      })
      .catch((err) => {
        console.log('Error occured while updating the Plant', err);
      });
  }
);

module.exports = router;
