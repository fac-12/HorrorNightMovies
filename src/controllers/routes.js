/* Main routes file*/
/*eslint-disable*/

const express = require('express');
const router = express.Router();
const queries = require('./queries');



router.get('/', (req, res, next) => {
    if (req.session.user) {
        queries
            .getMovies()
            .then(movies => res.render('moviesMain', { movies }))
            .catch(err => res.send(err))
    } else {
        res.redirect('/login')
    }

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
        .then(id => {
            res.redirect(`/getMovieInfo/${id}`)
        })
        .catch(err => res.send(err))
})

router.get('/addVote?', (req, res, next) => {
  const url = req.url;
  const user_id = 1;
  //  url.split('&')[0].split('=')[1];
  const movie_id = url.split('&')[1].split('=')[1];
    queries
    .addVote(movie_id, user_id)
    .then(res.redirect('/'))
    .catch(err => res.send(err))
})

router.get('/login', (req, res, next) => res.render('login'));

router.get('/logout', (req, res, next) => {
    req.session = null;
    res.redirect('/login')
});

router.post('/addUser', (req, res, next) => {
    const { body } = req;
    queries
        .addUser(body)
        .then((user) => {
            req.session.user = user;
            res.redirect('/')
        })
        .catch(err => res.send(err))
})

module.exports = router;
