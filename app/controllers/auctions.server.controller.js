const auction = require('../models/auctions.server.model');
const databaseHelper = require('../models/database.server.model');


exports.createAuction = function(){

};

exports.viewAuction = function(req, res){
    auction.viewAuction(req)
        .then((result) => res.status(result.code).send(result.message))

};
