const bcrypt = require('bcrypt');
const validator = require('validator');

/*eslint-disable*/

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

const validate = (pw, userData, username) => {
    return new Promise((resolve, reject) => {
        if (userData.length) {
            bcrypt.compare(pw, userData[0].password, (err, res) => {
                if (err) {
                    reject("bcrypt error: "+err);
                } else {
                    if (res) {
                        resolve(userData);
                    } else {
                        reject('Wrong password');
                    }
                }
            });
        } else {
            reject('User ' + username + ' does not exist, please sign up');
        }
    });
};

const validateNewUser = (reqbody, userData) => {
    return new Promise((resolve, reject) => {
        if (userData.length) {
            reject("Username " + reqbody.username + " already exists");
        } else {
            if (reqbody.password === reqbody.confirmpassword) {
                if (!validator.matches(reqbody.password, /[^\s]{8,}/)) {
                    reject("Password must be at least 8 characters");
                } else {
                    resolve(reqbody.password);
                }
            } else {
                reject("Passwords do not match");
            }
        }
    });
}

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
    validateNewUser,
}