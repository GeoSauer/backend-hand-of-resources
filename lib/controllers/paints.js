const { Router } = require('express');
const Paint = require('../models/Paint.js');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const paint = await Paint.getById(req.params.id);
      if (!paint) {
        next();
      }
      res.json(paint);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const paints = await Paint.getAll();
      res.json(paints);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const newPaint = await Paint.insert(req.body);
      res.json(newPaint);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const updatedPaint = await Paint.updateById(req.params.id, req.body);
      res.json(updatedPaint);
    } catch (e) {
      next(e);
    }
  });
