const lib = require('../lib/middleware/authMiddleware');
const photos = require('../controllers/photos.server.controller');

module.exports = function(app){
    app.route('/api/v1/auctions/:id/photos')
        .get(photos.getPhotoFromAuction)
        .post(lib.checkOwnsAuction, lib.checkAuctionStarted, photos.postPhoto)
        .delete(lib.checkOwnsAuction, lib.checkAuctionStarted, photos.deletePhoto);
};