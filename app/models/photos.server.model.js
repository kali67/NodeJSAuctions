const auction = require('../models/auctions.server.model');
const databaseHelper = require('../models/database.server.model');
const globals = require('../utilities/GlobalObjects');
const fs = require('fs');


exports.getPhoto = function (auctionId) {
    return auction.checkAuctionExists(auctionId)
        .then(() => findPhoto(auctionId), (reason) =>  {return Promise.reject(reason)})
        .then((result) => {return Promise.resolve(result)})
        .catch((reason) => {return Promise.reject(reason)});
};

function findPhoto (auctionId) {
    let sql = "select photo_image_URI from photo where photo_auctionid = ?";
    return databaseHelper.queryWithPromise(sql, [[auctionId]])
        .then((result) => {
            if (result.result[0]){return Promise.resolve(result.result[0])}
            else {return Promise.reject(globals.NotFoundRequest)}//TODO: no photos?
        }).catch((reason) => {return Promise.reject(reason)});
}


exports.uploadPhoto = function(request){
    let auctionid = request.params.id;
    let contentType = request.header('Content-Type');
    let uri = "app/lib/photos/" + auctionid + ".png";
    if (contentType === "image/jpeg"){uri = "app/lib/photos/" + auctionid + ".jpeg"}
    return auction.checkAuctionExists(auctionid)
        .then(() => {
            request.pipe(fs.createWriteStream(uri));
            databaseHelper.queryWithPromise("insert into photo (photo_auctionid, " +
                "photo_image_URI) values (?,?)", [[auctionid], [uri]]);})
        .then(() => {return Promise.resolve(globals.OKCreated)})
        .catch((reason) => {return Promise.reject(reason)});
};

exports.deletePhoto = function(auctionId){
    let sql = "delete from photo where photo_auctionid = ?";
    return auction.checkAuctionExists(auctionId)
        .then(() => databaseHelper.queryWithPromise(sql, [[auctionId]]), (reason) => {return Promise.reject(reason)})
        .then(() => {fs.unlinkSync();return Promise.resolve(globals.OK)})
        .catch((reason) => {return Promise.reject(reason)});
};

