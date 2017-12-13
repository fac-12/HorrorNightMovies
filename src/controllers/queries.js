const db = require('../database/dbConnection');

const getMovies = () =>
db.query(
  `SELECT movies.id, movies.title, movies.year, movies.rating, COUNT(movies.id)
   FROM movies FULL JOIN votes ON movies.id=votes.movie_id GROUP BY
   movies.id ORDER BY COUNT(movies.id) DESC`);

   module.exports = {
     getMovies,
     simple,
   }
