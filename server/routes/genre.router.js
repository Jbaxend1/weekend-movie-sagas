const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  const query = `SELECT * FROM "genres" ORDER BY "name" ASC;`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error: GET all Genres', err);
      res.sendStatus(500);
    })
});

router.get(`/featured/:id`, (req, res) => {
  // query to join DB on genre.id and movie.id?

  console.log('req.body:', req.params.id)
  // query to make to database
  const queryText = `
        SELECT "name" FROM "genres"
        JOIN "movies_genres" ON "genres"."id" ="movies_genres"."genre_id"
        JOIN "movies" ON "movies_genres"."movie_id" = "movies"."id"
        WHERE "movies"."id" = $1;`
  
  pool.query(queryText, [req.params.id])
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error: GET all Genres', err);
      res.sendStatus(500);
    })
});

module.exports = router;