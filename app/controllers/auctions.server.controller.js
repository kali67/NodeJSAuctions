const auction = require('../models/auctions.server.model');
const databaseHelper = require('../models/database.server.model');
const user = require('../models/users.server.model');


exports.createAuction = function(req, res){
    let token = req.header('X-Authorization');
    auction.createNewAuction(req.body, token)
        .then((result) => res.status(result.info.code).json(result.result[0]))
        .catch((reason) => res.send(reason));
};

exports.viewAuction = function(req, res){
    auction.viewAuction(req)
        .then((result) => res.status(result.code).json(result.message))
        .catch((reason) => console.log(reason));

};

exports.getAuction = function(req, res) {
  auction.getAuctionById(req.params.id)
      .then((result) => res.status(result.info.code).json(result.auctionObj))
      .catch((reason) => res.status(reason.code).json(reason.message));
};

exports.getAuctionBids = function(req, res){
    auction.getAuctionBids(req.params.id)
        .then((result) => res.send(result))
        .catch((reason) => res.status(reason.code).json(reason.message));
};

exports.makeBid = function(req, res){
    user.findUserByToken(req.header('X-Authorization'))
        .then((user) => auction.placeBid(req.query.amount, req.params.id, user))
        .then((result) => res.status(result.code).json(result.message))
        .catch((reason) => res.status(reason.code).json(reason.message));
};

exports.updateAuction = function(req, res){
    auction.patchAuction(req.body, req.params.id)
        .then((result) => res.status(result.info.code).json(result.info.message))
        .catch((reason) => res.status(reason.code).json(reason.message));
};
