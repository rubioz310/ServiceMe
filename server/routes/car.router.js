const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
  console.log(req.user.id, req.body);
  console.log(req.body);
  const {
      mileage,
      photo_url,
      make,
      model,
      year,
      vin,
      plates,
      last_service
  } = req.body;
  // RETURNING "id" will give us back the id of the created car
  const insertCarQuery = `INSERT INTO "car" ("mileage", "photo_url", "make", "model", "year", "vin", "plates")
                            VALUES ($1, $2, $3, $4, $5, $6, $7)
                            RETURNING "id";`

  // FIRST QUERY MAKES CAR
  pool.query(insertCarQuery, [mileage, photo_url, make, model, year, vin, plates])
  .then(result => {
    console.log('New car Id:', result.rows[0].id); //ID IS HERE!
    
    const createdCarId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "car_services" ("last_service", "car_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [last_service, createdCarId])
      .then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
});

module.exports = router;
