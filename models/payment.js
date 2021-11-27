const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    },
    createdAt: {type: Date, default: Date.now}
});

paymentSchema.pre(/^find/, function(next){
    this.populate('image');
    next();
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;