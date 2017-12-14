const db = require('../database/dbConnection');

const getMovies = () =>
  db.query(
    `SELECT movies.id, movies.title, movies.year, movies.rating, COUNT(movies.id)
   FROM movies FULL JOIN votes ON movies.id=votes.movie_id GROUP BY
   movies.id ORDER BY COUNT(movies.id) DESC`);

const singleMovieInfo = (id) =>
db.query(
   `SELECT movies.title, movies.year, movies.description, movies.rating, COUNT(movies.id) FROM movies FULL JOIN votes ON movies.id=votes.movie_id WHERE movies.id=${id} GROUP BY movies.id`);

const addMovie = newMovie => {
  const {title, year, description} = newMovie;
  return db.query(
    `INSERT INTO movies(title, year, description) VALUES($1,$2, $3) RETURNING ID`,
    [title, year, description])
    .then(newMovieID => newMovieID[0].id)
      };

  const addUser = addUser => {
    const {username, password } = addUser;
    return db.query(
      `INSERT INTO users(username, password) VALUES($1,$2)`,
      [username, password]);
    };

const addVote = (movie, user) => {
  const { movieId, userId } = addUpVote;
  return db.query(
    `INSERT INTO votes(movie_id, user_id) VALUES($1, $2)`, [movieId, userId]
  );
}

module.exports = {
  getMovies,
  singleMovieInfo,
  addMovie,
  addUser,
  addVote,
}
