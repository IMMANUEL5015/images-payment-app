const express = require('express');
const app = express();
const router = express.Router();
const image = require('./controllers/image');
const payment = require('./controllers/payments');

router.get('/', image.fetchImages);

router.get('/upload', (req, res) => {
    return res.render('upload');
});
router.post('/upload', image.upload(), image.createImage);

router.get('/payments', payment.fetchPayments);
router.post('/payments', 
    app.use(express.json()), 
    payment.createPayment
);

module.exports = router;