const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('./models');
const { Eligibility } = require('./eligibilityApi')
const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/', jsonParser, (req, res, next) => {
  console.log(req.body)
  const requiredFields = ['first_name', 'last_name', 'DOB', 'phone', 'insurance_carrier', 'insurance_ID'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field'
    });
  }

  let { first_name, last_name, DOB, phone, insurance_carrier, insurance_ID } = req.body;
  
  Eligibility.getDetails()
  .then(function (result) {
        console.log('api result',result)
      })
      .catch(err => {
        console.log("error");
      });

  
  return User
    .create({
      first_name,
      last_name,
      DOB,
      phone,
      insurance_carrier,
      insurance_ID
    })
    
    .then(user => {
      res.status(201).json({ code: 201, message: 'USER CREATED' });
    })
    .catch(err => {
      res.status(500).json({ code: 500, message: 'Internal server error' });
    });
});

router.get('/', (req, res) => {
  return User
    .find()
    .then(users => res.json(users.map(user => user.apiRepr())))
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

module.exports = { router };
