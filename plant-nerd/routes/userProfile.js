const express = require("express");
const router = express.Router();

const User = require('../models/User.model');
const Plant = require ('../models/Plant.model')



/* GET home page */
router.get("/", (req, res, next) => {
  res.render("main");
});

module.exports = router;