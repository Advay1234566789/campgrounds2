const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
api_key:process.env.CLOUDINARY_KEY,
api_secret: process.env.CLOUDINARY_SECRET
});



const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Yelcamp', // Folder name in Cloudinary
        allowedFormats: ['jpeg', 'png', 'jpg'], // Allowed formats
       // Use original file name
    }
});


module.exports = {
    cloudinary,
    storage
}