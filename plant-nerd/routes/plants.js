const express = require('express');
const router = express.Router();
const {redirectLoggedIn} = require('./guards/guards');
const fileUploader = require('../configs/cloudinary.config');
const Plant = require('../models/plant.model');
const Comment = require('../models/comment.model');
const User = require('../models/user.model');

router.get('/plants/create', redirectLoggedIn, (req, res, next) => {
  res.render('insidePlants/posts/createPost');
});

router.post('/plants/create', fileUploader.single('plantImg'), (req, res) => {
  const {name, description, location, date, season} = req.body;
  const author = req.session.currentUser._id;

  Plant.create({
    name,
    description,
    location,
    date,
    season,
    plantImg: req.file.path,
    author,
  }).then(() => res.redirect('/'));
});

router.post('/plantSearch', (req, res) => {
  const {searchPlant} = req.body;

  Plant.find({name: {$regex: searchPlant, $options: 'i'}}).then((plants) => {
    res.render('insidePlants/searchResults', {
      plants: plants,
    });
  });
});

router.get('/plants/:id', redirectLoggedIn, (req, res) => {
  const id = req.params.id;
  Plant.findById(id)
    .populate('author')
    .populate({
      path: 'comments',
      model: Comment,
      populate: {
        path: 'theAuthor',
        model: User,
      },
    })
    .then((plant) => {
      res.render('insidePlants/posts/plantDetails', {
        plant: plant,
      });
    });
});

router.post('/plants/:id/comment', redirectLoggedIn, (req, res) => {
  const plantId = req.params.id;
  const userId = req.session.currentUser._id;
  const {title, textField} = req.body;

  Comment.create({title, textField, theAuthor: userId})
    .then((comment) => {
      return Plant.findByIdAndUpdate(plantId, {$push: {comments: comment._id}});
    })
    .then(() => {
      res.redirect(`/plants/${plantId}`);
    });
});

module.exports = router;
