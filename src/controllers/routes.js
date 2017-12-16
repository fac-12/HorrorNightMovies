/* Main routes file*/
/*eslint-disable*/

const express = require('express');
const validator = require('validator');
const router = express.Router();
const queries = require('./queries');
const { hashPassword, validate, loginPageError, translateBool, validateNewUser } = require('./logic');

router.get('/', (req, res, next) => {
    if (req.session.user) {
        const userId = req.session.user.id;
        const username = req.session.user.username;
        queries
            .getMovies(userId)
            .then(movieArray => {
                const movies = translateBool(movieArray);
                res.render('moviesMain', { movies, username, userId });
            })
            .catch(err => res.send(err))
    } else {
        loginPageError(req, res, null, null);
    }

})

router.get('/getMovieInfo/:id', (req, res, next) => {
    if (req.session.user) {
        const { id } = req.params;
        const username = req.session.user.username;
        const userId = req.session.user.id;
        queries
            .singleMovieInfo(id, userId)
            .then(movieData => {
                const movie = translateBool(movieData);
                const singleMovie = movie[0];
                res.render('singleMovie', { singleMovie, username, userId });
            })
            .catch(err => res.send(err))
    } else {
        loginPageError(req, res, null, null);
    }
})

router.post('/addMovie', (req, res, next) => {
    const { body } = req;
    if (req.session.user) {
        if (body.title!==''&&body.year!=='') {
            queries
            .addMovie(req.session.user.id, body)
            .then(id => {
                res.redirect(`/getMovieInfo/${id}`)
            })
            .catch(err => res.send(err))
        }
    } else {
        loginPageError(req, res, null, null);
    }
})


router.get('/addVote?', (req, res, next) => {
    const userId = req.session.user.id;
    const movieId = req.url.split('?')[1];
    queries
        .checkVote(movieId, userId)
        .then(voteResponse => {
            if (voteResponse.length) {
                queries.removeVote(movieId, userId)
                    .then(res.status(200).send('removed vote'))
                    .catch(err => res.send(err))
            } else {
                queries.addVote(movieId, userId)
                    .then(res.status(201).send('added vote'))
                    .catch(err => res.send(err))
            }
        })
        .catch(err => res.send(err))
})

router.get('/login', (req, res, next) => {
    res.render('login', { loginError: req.session.loginError, signupError: req.session.signupError })
});

router.post('/loginUser', (req, res, next) => {
    queries
        .getUserData(req.body.username)
        .then(userData => validate(req.body.password, userData, req.body.username))
        .then(userData => {
            req.session.user = { id: userData[0].id, username: userData[0].username };
            res.redirect('/');
        })
        .catch(err => {
            loginPageError(req, res, null, err);
        });
});

router.get('/logout', (req, res, next) => {
    req.session = null;
    res.redirect('/login');
});

router.post('/addUser', (req, res, next) => {
    const { body } = req;
    queries
        .getUserData(req.body.username)
        .then(userData => validateNewUser(body, userData))
        .then(pw => hashPassword(pw))
        .then(pw => {
            body.password = pw;
            return queries.addUser(body);
        })
        .then(user => {
            req.session.user = user;
            res.redirect('/')
        })
        .catch(err => {
            loginPageError(req, res, err, null);
        });
})


module.exports = router;