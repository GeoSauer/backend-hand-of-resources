const { Router } = require('express');
const Paint = require('../models/Paint.js');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const paints = await Paint.getAll();
    res.json(paints);
  } catch (e) {
    next(e);
  }
});
