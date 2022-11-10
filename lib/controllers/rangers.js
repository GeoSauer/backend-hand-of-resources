const { Router } = require('express');
const Ranger = require('../models/Ranger');

module.exports = Router()
  .get('/:id', async (req, res) => {
    res.json({});
  })
  .get('/', async (req, res) => {
    const rangers = await Ranger.getAllRangers();
    res.json(rangers);
  });
