const db = require('../database/dbConnection');
/*eslint-disable*/
const getMovies = () =>
    db.query(
        `SELECT movies.id, movies.title, movies.year, movies.rating, COUNT(votes.movie_id)
   FROM movies FULL JOIN votes ON movies.id=votes.movie_id GROUP BY
   movies.id ORDER BY COUNT(votes.movie_id) DESC`);

const singleMovieInfo = (id) =>
    db.query(
        `SELECT movies.title, movies.year, movies.description, movies.rating, COUNT(movies.id) FROM movies FULL JOIN votes ON movies.id=votes.movie_id WHERE movies.id=${id} GROUP BY movies.id`);

const addMovie = newMovie => {
    const { title, year, description } = newMovie;
    return db.query(
            `INSERT INTO movies(title, year, description) VALUES($1,$2, $3) RETURNING ID`, [title, year, description])
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
}
