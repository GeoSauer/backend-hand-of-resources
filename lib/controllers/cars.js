const { Router } = require('express');
const Car = require('../models/Cars.js');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const car = await Car.getAll();
    res.json(car);
  } catch (e) {
    next(e);
  }
});
