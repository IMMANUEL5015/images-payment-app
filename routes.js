const router = require('express').Router();

router.get('/', (req, res) => {
    return res.render('home');
});

router.get('/upload', (req, res) => {
    return res.render('upload');
});

router.get('/payments', (req, res) => {
    return res.render('payments');
});

module.exports = router;