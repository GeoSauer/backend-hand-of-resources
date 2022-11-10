const { Router } = require('express');
const Ranger = require('../models/Ranger');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const ranger = await Ranger.getRangerById(req.params.id);
      if (!ranger) {
        next();
      }
      res.json(ranger);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const rangers = await Ranger.getAllRangers();
      res.json(rangers);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const newRanger = await Ranger.insertRanger(req.body);
      res.json(newRanger);
    } catch (e) {
      next(e);
    }
  });
