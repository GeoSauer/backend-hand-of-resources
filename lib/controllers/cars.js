const { Router } = require('express');
const Car = require('../models/Cars.js');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const car = await Car.getById(req.params.id);
      if (!car) {
        next();
      }
      res.json(car);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const cars = await Car.getAll();
      res.json(cars);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const newCar = await Car.insert(req.body);
      res.json(newCar);
    } catch (e) {
      next(e);
    }
  });
