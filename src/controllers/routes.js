/* Main routes file*/
/*eslint-disable*/

const express = require('express');
const validator = require('validator');
const router = express.Router();
const queries = require('./queries');
const { hashPassword, validate, loginPageError, translateBool } = require('./logic');

router.get('/', (req, res) => {
    if (req.session.user) {
        const userId = req.session.user.id;
        const username = req.session.user.username;
        queries
            .getMovies(userId)
            .then(movieArray => {
                const movies = translateBool(movieArray);
                res.render('moviesMain', { movies, username, userId });
            })
            .catch(err => next())
    } else {
        loginPageError(req, res, null, null);
    }

})

router.get('/getMovieInfo/:id', (req, res) => {
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
            .catch(err => next(err))
    } else {
        loginPageError(req, res, null, null);
    }
})

router.post('/addMovie', (req, res) => {
    const { body } = req;
    if (req.session.user) {
        queries
            .addMovie(req.session.user.id, body)
            .then(id => {
                res.redirect(`/getMovieInfo/${id}`)
            })
            .catch(err => next(err))
    } else {
        loginPageError(req, res, null, null);
    }
})


router.get('/addVote?', (req, res) => {
    const userId = req.session.user.id;
    const movieId = req.url.split('?')[1];
    queries
        .checkVote(movieId, userId)
        .then(voteResponse => {
            if (voteResponse.length) {
                queries.removeVote(movieId, userId)
                    .then(res.status(200).send('removed vote'))
                    .catch(err => next(err))
            } else {
                queries.addVote(movieId, userId)
                    .then(res.status(201).send('added vote'))
                    .catch(err => next(err))
            }
        })
        .catch(err => next(err))
})

router.get('/login', (req, res) => {
    res.render('login', { loginError: req.session.loginError, signupError: req.session.signupError })
});

router.post('/loginUser', (req, res) => {
    queries
        .getUserData(req.body.username)
        .then(userData => {
            if (userData.length) {
                validate(req.body.password, userData[0].password)
                    .then((okay) => {
                        if (okay) {
                            req.session.user = { id: userData[0].id, username: userData[0].username };
                            res.redirect('/');
                          } else {
                            loginPageError(req, res, null, 'Wrong password');
                        }
                    })
                    .catch(err => next(err));
            } else {
                loginPageError(req, res, null, 'User ' + req.body.username + ' does not exist, please sign up');
            }
        })
        .catch(err => next(err));
})

router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/login');
});

router.post('/addUser', (req, res) => {
    const { body } = req;
    queries
        .getUserData(req.body.username)
        .then(userData => {
            if (userData.length) {
                loginPageError(req, res, "Username " + req.body.username + " already exists", null);
            } else {
                if (body.password === body.confirmpassword) {
                    if (!validator.matches(body.password, /[^\s]{8,}/)) {
                        loginPageError(req, res, "Password must be at least 8 characters", null);
                    } else {
                        hashPassword(body.password)
                            .then((pw) => {
                                body.password = pw;
                                return queries.addUser(body)
                            })
                            .then((user) => {
                                req.session.user = user;
                                res.redirect('/')
                            })
                            .catch(err => next(err))
                    }
                } else {
                    loginPageError(req, res, "Passwords do not match", null);
                }

            }
        })
        .catch(err => next(err))
})

router.use((req, res) => {
  res.status(404).render('error', {
    layout: 'error',
    statusCode: 404,
    errorMessage: 'Page not found',
  });
});

router.use((err, req, res, next) => {
  res.status(500).render('error', {
    layout: 'error',
    statusCode: 500,
    errorMessage: 'Internal server error',
  });
});

module.exports = router;
