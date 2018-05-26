'use strict';

exports.checkMessage = (req, res, next) => {
    const reqUser = req.body.username;
    const reqMes = req.body.message;
    const reqShow = req.body.show;

    // post req validation
    if(!reqUser || !reqMes || !reqShow){
        res.status(404).json({message: "Field/s is/are empty!"});
    } else if(!(typeof reqUser === "string")){
        res.status(404).json({message: "Username must be a string"});
    } else if(!(reqUser.length > 2)){
        res.status(404).json({message: "Username too short"});
    } else if(!(typeof reqMes === "string")){
        res.status(404).json({message: "Message must be a string"});
    } else if(!(reqMes.length < 513)){
        res.status(404).json({message: "Message too long"});
    } else if(isNaN(reqShow)){
        res.status(404).json({message: "Show time is not a number"});
    } else if(!(reqShow > 0) || !(reqShow < 61)){
        res.status(404).json({message: "Show must be from 1 to 60"});
    } else {
        next();
    }
};

exports.setEndDate = (req, res, next) => {
    let reqBody = req.body;
    let now = new Date();

    // add id to remove messages
    reqBody._id = req.app.locals.messages.length;
    reqBody.date = now.toLocaleString();
    reqBody.endAtMs = now.getTime() + reqBody.show*1000;
    reqBody.endAt = (new Date(reqBody.endAtMs)).toLocaleString();
    next();
};