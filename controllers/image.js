const path = require('path');
const Image = require('../models/image');
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_REGION,
    apiVersion: "2010-12-01"
});

const uploadDetails = {
    style: 'single', acl: 'public-read', folder: 'other-images', fieldName: 'image',
    fileSize: { fileSize: 500000 }
}

exports.upload = (fileDetails = uploadDetails) => multer({
    storage: multerS3({
        s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: fileDetails.acl,
        key: (req, file, cb) => {
            let newFilename = `${fileDetails.folder}/${file.originalname}`;
            newFilename += '-' + Date.now() + path.extname(file.originalname);
            cb(null, newFilename);
        }
    }),
    limits: fileDetails.fileSize,
})[fileDetails.style](fileDetails.fieldName);

exports.createImage = async (req, res, next) => {
    try{
        await Image.create({
            ...req.body,
            key: req.file.key,
            link: req.file.location
        });

        return res.redirect('/');
    }catch(err){
        return res.render('error', err);
    }
}

exports.fetchImages = async (req, res, next) => {
    try{
        const images = await Image.find({});
        return res.render('home', {images});
    }catch(err){
        return res.render('error', err);
    }
}