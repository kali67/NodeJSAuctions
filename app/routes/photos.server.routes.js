const lib = require('../lib/middleware/authMiddleware');
const photos = require('../controllers/photos.server.controller');
const bodyParser = require('body-parser');

module.exports = function(app){
    app.route('/api/v1/auctions/:id/photos')
        .get(photos.getPhotoFromAuction)
        .post(lib.authenticateToken,photos.postPhoto)
        .delete(lib.authenticateToken, photos.deletePhoto);
};