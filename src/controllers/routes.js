/* Main routes file*/

const express = require('express');
const router = express.Router();
const queries = require('./queries');

router.get('/', (req, res, next) => {
  queries
    .getMovies()
    .then(movies =>console.log(movies))
    .catch(err => console.log(err))
})

module.exports = router;
