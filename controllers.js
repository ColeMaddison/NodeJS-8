'use strict';

const fs = require('fs');
const path = require('path');

let dir = path.join(__dirname, 'public/img');

exports.ejsRender = (req, res, next)=>{
    let itemsDir = [];
    fs.readdir(dir, (err, items)=>{
        if(err) console.error(err);
        items.forEach(item=>{
            // go up dir because will be used in teh views folder
            // MAKE SURE!!!! use containing folder, because public folder is already mentioned in static app.use(server.js)
            itemsDir.push({img:`/img/${item}`, alt: item.split('.')[0]});
        });
        res.render('index', {
            title: 'New document',
            data: 'Some text',
            images: itemsDir
        });
    });
};

