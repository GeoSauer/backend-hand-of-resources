const { Router } = require('express');
const Druid = require('../models/Druid');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const druids = await Druid.getAll();
    res.json(druids);
  } catch (e) {
    next(e);
  }
});
