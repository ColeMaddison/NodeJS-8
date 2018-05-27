'use strict';

const express = require('express');
const router = express.Router();
const ctrl = require('./controllers');
const mdl = require('./middleware');

router.get('/', mdl.getFavicon, ctrl.ejsRender);

router.post('/message', mdl.checkMessage, mdl.setEndDate, ctrl.saveMessage);

router.get('/messages', ctrl.showMessages);

router.get('/*', ctrl.handler404);

module.exports = router;