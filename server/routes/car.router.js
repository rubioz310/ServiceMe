const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

// get all cars fr the current user
router.get('/', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  const query = `
      select  uc.id as user_car_id, c.id as car_id, photo_url, make, model, "year", cs.id as service_id, last_service
      from car as c
      left join user_car as uc on c.id = uc.car_id
      left join car_services as cs on cs.car_id = c.id
      where uc.user_id = $1;`;
  pool.query(query, [userId])
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error getting cars', err);
      res.sendStatus(500)
    })

});

router.post('/', rejectUnauthenticated, (req, res) => {
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
          console.log('Error creating user car relation:',err);
          res.sendStatus(500)
        })

      }).catch(err => {
        // catch for second query
        console.log('Error creating car service:',err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log('Error adding car:',err);
    res.sendStatus(500)
  })
});

router.get('/details/:id', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  const carId = req.params.id
  const query = `
      select  uc.car_id, mileage, photo_url, make, model, year, vin, plates, user_id, last_service
      from car as c
      left join user_car as uc on c.id = uc.car_id
      left join car_services as cs on cs.car_id = c.id
      where uc.user_id = $1 and c.id = $2;`;
  pool.query(query, [userId, carId])
    .then( result => {
      res.send(result.rows[0]);
    })
    .catch(err => {
      console.log('Error getting car details', err);
      res.sendStatus(500)
    })

});
module.exports = router;