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
  })
  .post('/', async (req, res, next) => {
    try {
      const newDruid = await Druid.insert(req.body);
      res.json(newDruid);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const updatedDruid = await Druid.updateById(req.params.id, req.body);
      res.json(updatedDruid);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const deletedDruid = await Druid.deleteById(req.params.id);
      res.json(deletedDruid);
    } catch (e) {
      next(e);
    }
  });
