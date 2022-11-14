const { Router } = require('express');
const Car = require('../models/Car.js');

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
  })
  .put('/:id', async (req, res, next) => {
    try {
      const updatedCar = await Car.updateById(req.params.id, req.body);
      res.json(updatedCar);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const deletedCar = await Car.deleteById(req.params.id);
      res.json(deletedCar);
    } catch (e) {
      next(e);
    }
  });
