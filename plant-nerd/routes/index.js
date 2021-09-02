const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('main');
});

router.get('/explore', (req, res, next) => {
  res.render('insidePlants/plantsMain');
});

module.exports = router;
