const express = require('express');
const router = express.Router();
const fileUploader = require('../configs/cloudinary.config');
const {redirectLoggedIn} = require('./guards/guards');

const Plant = require('../models/plant.model');

router.get('/user/my-posts', redirectLoggedIn, (req, res) => {
  const userID = req.session.currentUser._id;

  Plant.find({author: userID}).then((posts) => {

    posts.forEach(post => {
      const d = new Date(post.foundOnDate);
      post.foundDate = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
    })

    res.render('insidePlants/posts/userPosts', {
      posts: posts,
    });
  });
});

router.post('/deletePost/:id', redirectLoggedIn, (req, res, next) => {
  const id = req.params.id;
  Plant.findByIdAndDelete(id).then(res.redirect('/user/my-posts'));
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
  '/editPost/:id/',
  fileUploader.single('plantPic'),
  redirectLoggedIn,
  (req, res, next) => {
    const id = req.params.id;
    const updatedPost = {
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      season: req.body.season,
    };

    if (req.body.date) {
      updatedPost.date = req.body.date;
    }
    if (req.file) {
      updatedUser.profilePic = req.file.path;
    }

    Plant.findByIdAndUpdate(id, updatedPost, {new: true}).then(() => {
      res.redirect('/user/my-posts');
    });
  }
);

module.exports = router;