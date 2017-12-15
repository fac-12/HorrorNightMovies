const db = require('../database/dbConnection');
/*eslint-disable*/
const getMovies = (userid) =>
    db.query(
        `SELECT movies.id, (SELECT CASE WHEN EXISTS (SELECT movie_id FROM votes WHERE movie_id=movies.id AND user_id=${userid}) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END),(SELECT username FROM users WHERE id = movies.user_id), movies.title, movies.year, COUNT(votes.movie_id)
   FROM movies FULL JOIN votes ON movies.id=votes.movie_id GROUP BY
   movies.id ORDER BY COUNT(votes.movie_id) DESC`);

const singleMovieInfo = (id, userid) =>
    db.query(
        `SELECT movies.id, (SELECT username FROM users WHERE id = movies.user_id), movies.title, movies.year, movies.description, (SELECT CASE WHEN EXISTS (SELECT movie_id FROM votes WHERE movie_id=movies.id AND user_id=${userid}) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END), COUNT(votes.movie_id) FROM movies FULL JOIN votes ON movies.id=votes.movie_id WHERE movies.id=${id} GROUP BY movies.id`);

const addMovie = (id, newMovie) => {
    const { title, year, description } = newMovie;
    return db.query(
            `INSERT INTO movies(user_id, title, year, description) VALUES($1,$2, $3, $4) RETURNING ID`, [id, title, year, description])
        .then(newMovieID => newMovieID[0].id)
};

const addUser = addUser => {
    return db.query(
        `INSERT INTO users(username, password) VALUES($1,$2) RETURNING USERNAME, ID`, [addUser.username, addUser.password]).then(nameArray => nameArray[0]);
};

const getUserData = username => {
    return db.query('SELECT * FROM users WHERE username = $1', [username]);
}

const addVote = (movie_id, user_id) => {
    return db.query(
        `INSERT INTO votes(movie_id, user_id) VALUES($1, $2) RETURNING user_id`, [movie_id, user_id]);
};

const removeVote = (movie_id, user_id) => {
    return db.query(
        `DELETE FROM votes WHERE movie_id=${movie_id} AND user_id=${user_id}`
    );
};

const checkVote = (movie_id, user_id) => {
    return db.query(
        `SELECT * FROM votes WHERE movie_id=${movie_id} AND user_id=${user_id}`
    );
};

module.exports = {
    getMovies,
    singleMovieInfo,
    addMovie,
    addUser,
    getUserData,
    addVote,
    checkVote,
    removeVote,
}