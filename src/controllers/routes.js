/* Main routes file*/

const express = require('express');
const router = express.Router();
const queries = require('./queries');


router.get('/', (req, res, next) => {
    queries
        .getMovies()
        .then(movies => res.render('moviesMain', { movies }))
        .catch(err => res.send(err))
})

router.get('/getMovieInfo/:id', (req, res, next) => {
    const { id } = req.params;
    console.log(req.params);
    // queries
    // .singleMovieInfo()
    // res.render('singleMovie', { singleMovie })
})

module.exports = router;