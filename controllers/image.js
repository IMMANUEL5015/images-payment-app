const Image = require('../models/image');
const multer = require('multer');
const AWS = require('aws-sdk');

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '');
    }
});

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
});

exports.upload = multer(storage).single('image');

exports.createImage = (req, res, next) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${req.file.originalname}`,
        Body: req.file.buffer
    }

    s3.upload(params, async (error, data) => {
        if (error) return res.render('error', err);
        await Image.create({
            ...req.body,
            link: data.Location,
            key: data.key
        });

        return res.redirect('/');
    });
}

exports.fetchImages = async (req, res, next) => {
    try{

        return res.render('home');
    }catch(err){
        return res.render('error', err);
    }
}