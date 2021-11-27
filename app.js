const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes');
const image = require('./controllers/image');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

mongoose.connect(process.env.MONGODB_URI)
.then(res => console.log('Sucessfully connected to db'))
.catch(err => console.log(err.message));

app.use(routes);

app.all('*', image.fetchImages);

module.exports = app;