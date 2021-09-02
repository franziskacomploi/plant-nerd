const express = require('express');
const router = express.Router();
const {redirectLoggedIn} = require('./guards/guards');
const fileUploader = require('../configs/cloudinary.config');
const Plant = require('../models/plant.model');

router.get('/plants/create', redirectLoggedIn, (req, res, next) => {
  res.render('insidePlants/posts/createPost');
});

router.post('/plants/create', fileUploader.single('plantImg'), (req, res) => {
  const {name, description, location, date, season} = req.body;

  Plant.create({
    name,
    description,
    location,
    date,
    season,
    plantImg: req.file.path,
  })
    .then(() => res.redirect('/'))
    .catch((error) =>
      console.log(`Error while creating a new plant: ${error}`)
    );
});

module.exports = router;
