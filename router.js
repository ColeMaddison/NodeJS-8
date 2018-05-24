'use strict';

const express = require('express');
const router = express.Router();
const ctrl = require('./controllers');
const mdl = require('./middleware');

router.get('/', ctrl.ejsRender);

router.post('/message', ctrl.saveMessage);

router.get('/messages', ctrl.showMessages);

module.exports = router;