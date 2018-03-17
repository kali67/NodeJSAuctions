const auction = require('../controllers/auctions.server.controller');
const lib = require('../lib/middleware/authMiddleware');

module.exports = function(app){
    app.route('/api/v1/auctions')
        .post(lib.authenticateToken, auction.createAuction)
        .get(auction.viewAuction);
    app.route('/api/v1/auctions/:id')
         .get(auction.getAuction)
         .patch(lib.authenticateToken, auction.updateAuction);
    app.route('/api/v1/auctions/:id/bids')
        .get(auction.getAuctionBids)
        .post(lib.authenticateToken, auction.makeBid);
};