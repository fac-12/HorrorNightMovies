/* Main routes file*/
/*eslint-disable*/

const express = require('express');
const validator = require('validator');
const router = express.Router();
const queries = require('./queries');
const queryString = require('query-string');
const { hashPassword, validate, loginPageError } = require('./logic');

router.get('/', (req, res, next) => {
    if (req.session.user) {
        const userId = req.session.user.id;
        const username = req.session.user.username;
        queries
            .getMovies()
            .then(movies => res.render('moviesMain', { movies, username, userId }))
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
            .singleMovieInfo(id)
            .then(movie => {
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
        queries
            .addMovie(body)
            .then(id => {
                res.redirect(`/getMovieInfo/${id}`)
            })
            .catch(err => res.send(err))
    } else {
        loginPageError(req, res, null, null);
    }
})


router.get('/addVote?', (req, res, next) => {
  const userId = req.session.user.id;
  const data = queryString.parse(req.url.split('?')[1]);
  console.log(data);
    queries
    .checkVote(data.movie, data.user)
    .then(voteResponse => {
        console.log(voteResponse);
        if (voteResponse.length){
            res.redirect('back');
            console.log('already voted');
        }else{
            console.log('new vote');
            queries.addVote(data.movie, data.user)
            .then(res.redirect('/'))
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
                    .catch(err => res.send(err));
            } else {
                loginPageError(req, res, null, 'User ' + req.body.username + ' does not exist, please sign up');
            }
        })
        .catch(err => res.send(err));
})

router.get('/logout', (req, res, next) => {
    req.session = null;
    res.redirect('/login');
});

router.post('/addUser', (req, res, next) => {
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
                            .catch(err => res.send(err))
                    }
                } else {
                    loginPageError(req, res, "Passwords do not match", null);
                }

            }
        })
        .catch(err => res.send(err))
})


module.exports = router;
