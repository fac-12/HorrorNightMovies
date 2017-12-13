/* Main routes file*/

const express = require('express');
const router = express.Router();
const queries = require('./queries');

const movies = [{
    id: 1,
    title: "Titanic",
    year: 1997,
    rating: 7.8,
    count: 1,
}, {
    id: 2,
    title: "Titanic",
    year: 1997,
    rating: 7.8,
    count: 1,
}]

const singleMovie = {
    id: 3,
    title: "Titanic",
    year: 1997,
    rating: 7.8,
    count: 1,
    description: "Big boat sinks"
}

router.get('/', (req, res, next) => {
    queries
        .getMovies()
        .then(movies => res.send(movies))
        .catch(err => res.send(err))
})

router.get('/getMovies', (req, res, next) => {
    res.render('moviesMain', { movies })
})

router.get('/getMovieInfo:id', (req, res, next) => {
    res.render('singleMovie', { singleMovie })
})

module.exports = router;