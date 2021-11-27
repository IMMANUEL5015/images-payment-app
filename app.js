const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.MONGODB_URI)
.then(res => console.log('Sucessfully connected to db'))
.catch(err => console.log(err.message));

module.exports = app;