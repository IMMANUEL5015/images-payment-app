const crypto = require('crypto');
const Payment = require('../models/payment');

exports.fetchPayments = async (req, res, next) => {
    try{
        const payments = await Payment.find({});
        return res.render('payments', {payments});
    }catch(error){
        res.render('error');
    }
}

exports.createPayment = async (req, res, next) => {
    try{
        const secret = process.env.SECRET_KEY;

        var hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');

        if (hash == req.headers['x-paystack-signature']) {
            const event = req.body;
            
            if(event.event === 'charge.success'){
                await Payment.create({
                    reference: event.data.reference,
                    image: event.data.metadata.imageId 
                });
            }
        }
        res.sendStatus(200);
    }catch(error){
        console.log(error);
    }
}