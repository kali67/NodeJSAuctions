const photos = require('../models/photos.server.model');


exports.getPhotoFromAuction = function(req, res){
    photos.getPhoto(req.params.id, req.body)
        .then()
        .catch()
};