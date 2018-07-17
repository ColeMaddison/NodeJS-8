'use strict';

// const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const url = require('url');
const selectOptions = require('./utils');
const MessageModel = require('./messageModel/messageModel');

// index route
exports.startPage = (req, res) =>{
    res.render(
        path.join(__dirname, 'views/client'),
        {
            endsAt: selectOptions.endAtSeconds,
            title: 'NodeJs E6'
        }
    );
}

exports.postMessage = (req, res) => {
    const data = req.body;
    const userMessage = new MessageModel({
        username: data.username,
        message: data.message,
        show: data.show,
        endsAt: (Date.now() + (data.show * 1000))
    });

    userMessage.save(err => {
        if(err){
            console.log(err);
        } else {
            res.send({message: 'Message added'});
        }
    });
}

exports.getAllMessages = (req, res) => {
    const query = url.parse(req.url).query;
    if(query){
        showMessagesWithQuery(query, res);
    } else {
        showMessagesNoQuery(res);
    }
}

const showMessagesWithQuery = (query, res) => {
    const queryObj = querystring.parse(query);
    
    if(!('endsAt' in queryObj || 'user' in queryObj)){
        return res.status(404).end("Bad query");
    } else {
        let endsAtSort = {endsAt: 'asc'};
        let usernameFind = queryObj.user ? {'username': queryObj.user} : {};

        if(queryObj.endsAt === 'asc' || queryObj.endsAt === 'desc'){
            endsAtSort = {'endsAt': queryObj.endsAt};
        }

        MessageModel
            .find(usernameFind)
            .sort(endsAtSort)
            .exec((err, messages) => {
                if(err) {
                    res.send(err);
                } else {
                    res.render(
                        path.join(__dirname, 'views/messages'),
                        {
                            messageData: messages,
                            title: 'NodeJs E8'
                        }
                    );
                }
            })
    }
}

const showMessagesNoQuery = res => {
    MessageModel.find({}, (err, data) => {
        if(err){
            console.log(err)
        } else {
            res.render(
                path.join(__dirname, 'views/messages'),
                {
                    messageData: data,
                    title: 'NodeJs E8'
                }
            );
        }
    });
}

exports._getDbData = (req, res) => {
    MessageModel.find({}, (err, data) => {
        if(err){
            console.log(err)
        } else {
            res.send(data);
        }
    });
}

setInterval(() => {
    MessageModel
        .find({})
        .select('endsAt')
        .exec((err, data) => {
            let currentDate = Date.now();
            for(let item of data) {
                if(item.endsAt < currentDate){
                    MessageModel
                        .findByIdAndRemove(item._id)
                        .exec((err, data) => {
                            if(err){
                                console.error(err);
                            }
                        })
                }
            }
        })
        ;
}, 2000);

exports.handler404 = (req, res) => {
    res.status('404').end("Not Found");
};
