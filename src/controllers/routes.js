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
    queries
        .singleMovieInfo(id)
        .then(singleMovie => res.render('singleMovie', { singleMovie }))
        .catch(err => res.send(err))
})

module.exports = router;