// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
require('dotenv').config();
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
const accountSid = 'process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(accountSid, authToken);

  router.get('/', (req, res) => {
    const queryText = `
            SELECT * FROM "user" as u
            JOIN "user_car" as uc on uc.user_id=u.id
            join "car" as c on c.id=uc.car_id
            where last_service - CURRENT_DATE <= 7
        `;
  pool
    .query(queryText, [])
    .then(results => {
        console.log(results.rows[0])
        client.messages
        .create({
            body: `
Dear ${results.rows[0].first_name} ${results.rows[0].last_name}:
Your ${results.rows[0].year} ${results.rows[0].make} ${results.rows[0].model} next service is due soon 
`,
            from: '+19382232238',
            to: results.rows[0].phone_number
        })
        .then(result => {
            console.log('Text message sent');
            res.sendStatus(200);
        })
        .catch(err => {
            console.log('Error sending txt', err);
            res.sendStatus(500);
        })
    })
    .catch((err) => {
      console.log('Error getting phone numbers', err);
      res.sendStatus(500);
    });
    
  });

  module.exports = router;