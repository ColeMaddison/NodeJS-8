'use strict';

exports.checkMessage = (req, res, next) => {
    next();
};

exports.setEndDate = (req, res, next) => {
    let reqBody = req.body;
    let now = new Date();
    reqBody._id = req.app.locals.messages.length;
    reqBody.date = now.toLocaleString();
    reqBody.endAtMs = now.getTime() + reqBody.show*1000;
    reqBody.endAt = (new Date(reqBody.endAtMs)).toLocaleString();
    next();
};