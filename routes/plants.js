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
  const {name, description, location, foundOnDate, season} = req.body;
  const author = req.session.currentUser._id;

  if (!name || !location || !foundOnDate) {
    res.render('insidePlants/posts/createPost', {
      errorMessage: 'You need a name, a location and a date to create a post.',
    });
    return;
  }

  Plant.create({
    name,
    description,
    location,
    foundOnDate,
    season,
    plantImg: req.file ? req.file.path : '/styles/images/logo1.png',
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
      let d = new Date(plant.foundOnDate);
      let foundDate = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
      res.render('insidePlants/posts/plantDetails', {
        plant: plant,
        foundDate,
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


router.get('/plants/:id/userProfile', redirectLoggedIn, (req, res) => {
  const authorId = req.params.id;

  Plant.find({author: authorId})
    .populate('author')
    .then((result) => {
      let d = new Date(result[0].author.birthday);
      let birthDate = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;


      res.render('insidePlants/userProfile', {
        plants: result,
        birthDate,
      });
    });
});


module.exports = router;