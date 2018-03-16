const auction = require('../models/auctions.server.model');
const databaseHelper = require('../models/database.server.model');


exports.createAuction = function(req, res){
    let token = req.header('X-Authorization');
    auction.createNewAuction(req.body, token)
        .then((result) => res.status(result.info.code).send(result.result[0]))
        .catch((reason) => res.send(reason));
};

exports.viewAuction = function(req, res){
    auction.viewAuction(req)
        .then((result) => res.status(result.code).send(result.message))
        .catch((reason) => console.log(reason));

};

exports.getAuction = function(req, res) {
  auction.getAuctionById(req.params.id)
      .then((result) => res.status(result.info.code).send(result.auctionObj))
      .catch((reason) => res.status(reason.code).send(reason.message));
};

exports.getAuctionBids = function(req, res){
    auction.getAuctionBids(req.params.id, null)
        .then((result) => res.status(200).send(result.bids))
        .catch((reason) => res.status(reason.code).send(reason.message));
};