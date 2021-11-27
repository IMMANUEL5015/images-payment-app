const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    price: {type: Number, required: [true, 'Please provide image price!']},
    link: {type: String, required: [true, 'Please provide image link!']},
    description: String,
    createdAt: {type: Date, default: Date.now}
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;