const router = require('express').Router();
const image = require('./controllers/image');

router.get('/', image.fetchImages);

router.get('/upload', (req, res) => {
    return res.render('upload');
});
router.post('/upload', image.upload(), image.createImage);

router.get('/payments', (req, res) => {
    return res.render('payments');
});

module.exports = router;