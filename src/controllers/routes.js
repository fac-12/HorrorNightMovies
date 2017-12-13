/* Main routes file*/
/*eslint-disable*/

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
        .then(movie => {
            const singleMovie = movie[0];
            res.render('singleMovie', { singleMovie });
        })
        .catch(err => res.send(err))
})

router.post('/addMovie', ({ body }, res, next) => {
    queries
    .addMovie(body)
    .then(res.send('success'))
    .catch(err => res.send(err))
})

module.exports = router;