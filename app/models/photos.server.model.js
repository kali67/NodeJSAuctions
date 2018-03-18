const auction = require('../models/auctions.server.model');
const db = require('../models/database.server.model');


exports.getPhoto = function (auctionId, reqBody) {
    return auction.checkAuctionExists(auctionId)
        .then(() => findPhoto(reqBody), (reason) => {return Promise.resolve(reason)})
};

function findPhoto (reqBody) {
    req.pipe(fs.createWriteStream(picturePath));
}
