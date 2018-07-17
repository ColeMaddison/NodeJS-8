'use strict';

const express = require('express');
const app = express();
const path = require('path');
const routes = require('./router');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

// create db
mongoose.connect('mongodb://localhost/MessagesCollection');

let db = mongoose.connection;

// check db connection
db.on('error', console.error.bind(console, 'We have a db error:'));
db.on('open', () => {
    console.log('Connection established!');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.messages = [];

app.use(express.urlencoded());
app.use(express.json());

app.use(routes);

app.listen(PORT, ()=>{
    console.log(`Server up and running on port - ${PORT}`);
});