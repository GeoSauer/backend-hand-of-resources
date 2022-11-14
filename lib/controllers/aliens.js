const { Router } = require('express');
const Alien = require('../models/Alien');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const alien = await Alien.getById(req.params.id);
      if (!alien) {
        next();
      }
      res.json(alien);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const aliens = await Alien.getAll();
      res.json(aliens);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const newAlien = await Alien.insert(req.body);
      res.json(newAlien);
    } catch (e) {
      next(e);
    }
  });
