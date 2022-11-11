const { Router } = require('express');
const Druid = require('../models/Druid');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const druid = await Druid.getById(req.params.id);
      if (!druid) {
        next();
      }
      res.json(druid);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const druids = await Druid.getAll();
      res.json(druids);
    } catch (e) {
      next(e);
    }
  });
