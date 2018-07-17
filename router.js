'use strict';

const express = require('express');
const router = express.Router();
const ctrl = require('./controllers');
const mdl = require('./middleware');
const path = require('path');

router.get('/', ctrl.startPage);

router.post('/', mdl.checkMessage, ctrl.postMessage);

router.get('/messages', ctrl.getAllMessages);

router.get('/db', ctrl._getDbData);


// router.get('/messages', ctrl.showMessages);

router.get('/*', ctrl.handler404);

module.exports = router;