'use strict';

const fs = require('fs');
const path = require('path');

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
    res.status(200).json({data: req.app.locals.messages});
};

// save a message
exports.saveMessage = (req, res)=>{
    let resMessage = req.body;
    let db = req.app.locals.messages;
    db.push(resMessage);

    // get message to remove
    // arr.find did not work, had to do that because arr.length is dinamic and can reduce and enlarge
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

