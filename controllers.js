'use strict';

const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const url = require('url');

let dir = path.join(__dirname, 'public/img');

// images and messages render handler via ejs templates
exports.ejsRender = (req, res)=>{
    let itemsDir = [];
    fs.readdir(dir, (err, items)=>{
        if(err) console.error(err);
        items.forEach(item=>{
            // go up dir because will be used in teh views folder
            // MAKE SURE!!!! use containing folder, because public folder is already mentioned in static app.use(server.js)
            itemsDir.push({img:`/img/${item}`, alt: item.split('.')[0]});
        });
        res.render('index', {
            messages: req.app.locals.messages,
            title: 'New document',
            data: 'Some text',
            images: itemsDir
        });
    });
};

// show all saved messages
exports.showMessages = (req, res)=>{
    let query = url.parse(req.url).query;
    let queryObj = querystring.parse(query);
    let db = req.app.locals.messages;
    let searchRes = [];

    // if query - check if key in db - check every item in db, if nothing found - break to outer loop to start over from new db item
    if(query){
        OUTER:
        for(let dbItem of db){
            for(let item in queryObj){
                if(!(item === "endAt" || item === "username")){
                    return res.status(404).end("Bad qquery1");
                } else {
                    if(queryObj[item] === dbItem[item]){
                        continue;
                    } else {
                        break OUTER;
                    }
                }
            }
            searchRes.push(dbItem);
        }
        res.json(searchRes);
    } else {
        res.status(200).json({data: db});
    }
};

// save a message
exports.saveMessage = (req, res)=>{
    let resMessage = req.body;
    let db = req.app.locals.messages;
    db.push(resMessage);

    // get message to remove
    // arr.find did not work, had to do that because arr.length is dinamic (arr.length is id of messages) and can reduce and enlarge
    let mesToRemove = {};

    for (let val of db){
        if(val._id === resMessage._id){
            mesToRemove = val;
        }
    }

    // remove message timeout
    setTimeout(()=>{
        db.splice(db.indexOf(mesToRemove), 1);
    }, resMessage.show * 1000);

    res.send('OK');
};

exports.handler404 = (req, res, next) => {
    res.status('404').end("Not Found");
};

