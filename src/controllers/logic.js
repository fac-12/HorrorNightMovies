const bcrypt = require('bcrypt');

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
};

const validate = (pw, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(pw, hash, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const translateBool = (array) => {
    
    array.forEach(function(movie) {
        movie.case = (movie.case === '1') ? true : false;
    });
    return array;
};

const loginPageError = (req, res, signupError, loginError) => {
    req.session.loginError = loginError;
    req.session.signupError = signupError;
    res.redirect('/login');
}

module.exports = {
    hashPassword,
    validate,
    loginPageError,
    translateBool,
}