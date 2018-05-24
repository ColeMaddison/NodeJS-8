'use strict';

const express = require('express');
const router = express.Router();
const ctrl = require('./controllers');

router.get('/', ctrl.ejsRender);

module.exports = router;