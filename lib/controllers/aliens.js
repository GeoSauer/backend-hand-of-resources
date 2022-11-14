const { Router } = require('express');
const Alien = require('../models/Alien');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const aliens = await Alien.getAll();
    res.json(aliens);
  } catch (e) {
    next(e);
  }
});
