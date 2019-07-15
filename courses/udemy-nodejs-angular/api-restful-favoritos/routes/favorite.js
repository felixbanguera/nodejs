'use strict'

var express = require('express');

var favoriteController = require('../controllers/favorite');

var api = express.Router();

api.get('/favTest', favoriteController.favoriteTest);

module.exports = api;