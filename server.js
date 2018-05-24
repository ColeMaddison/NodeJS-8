'use strict';

const express = require('express');
const app = express();
const path = require('path');
const routes = require('./router');

const PORT = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded());
app.use(express.json());

app.use(routes);

app.listen(PORT, ()=>{
    console.log(`Server up and running on port - ${PORT}`);
});