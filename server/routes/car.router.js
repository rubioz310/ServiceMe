const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here

});

router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
  const user_id = req.user.id;
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
    
    const createdCarId = result.rows[0].id

    const insertMovieGenreQuery = `
      INSERT INTO "car_services" ("last_service", "car_id")
      VALUES  ($1, $2);
      `;
      // SECOND QUERY ADDS LAST SERVICE FOR CREATED CAR
      pool.query(insertMovieGenreQuery, [last_service, createdCarId])
      .then(result => {

        const insertUserCarQuery = `
          INSERT INTO "user_car" (user_id, car_id, role)
          VALUES ($1, $2, $3);`;  
        // Third query add user, car and role
        pool.query(insertUserCarQuery, [user_id, createdCarId, 'Personal'])
        .then(result => {
          //Once all three queries are done it will send an answer back to client
          res.sendStatus(201);
        }).catch(err => {
          //Catch for third query
          console.log(err);
          res.sendStatus(500)
        })

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
