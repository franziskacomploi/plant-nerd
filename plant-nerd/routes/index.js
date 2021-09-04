const express = require('express');
const router = express.Router();
const {redirectLoggedIn} = require('./guards/guards');

const Plant = require('../models/plant.model');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('main');
});

router.get('/explore', redirectLoggedIn, (req, res, next) => {
  Plant.find().then((result) => {
    const compare = (a, b) => {
      if (a.foundOnDate < b.foundOnDate) {
        return 1;
      }
      if (a.foundOnDate > b.foundOnDate) {
        return -1;
      }
      return 0;
    };
    const plants = result.sort(compare);
    res.render('insidePlants/plantsMain', {
      userInSession: req.session.currentUser,
      plants: plants,
    });
  });
});

module.exports = router;
