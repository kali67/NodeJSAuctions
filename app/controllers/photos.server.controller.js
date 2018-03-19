const photos = require('../models/photos.server.model');
const global = require('../utilities/GlobalObjects');
const fs = require('fs');


exports.getPhotoFromAuction = function(req, res){
    photos.getPhoto(req.params.id, req.body)
        .then((result) => {
            res.header({"Content-Type": "image/png"});
            res.status(global.OK.code);
            fs.createReadStream(result.photo_image_URI).pipe(res);})
        .catch((reason) => res.status(reason.code).send(reason.message));
};

exports.postPhoto = function(req, res){
    photos.uploadPhoto(req)
        .then((result) => res.status(result.code).send(result.message))
        .catch((reason) => res.status(reason.code).send(reason.message));
};

exports.deletePhoto = function(req, res){
    photos.deletePhoto(req.params.id)
        .then((result) => res.status(result.code).send(result.message))
        .catch((reason) => res.status(reason.code).send(reason.message));
};