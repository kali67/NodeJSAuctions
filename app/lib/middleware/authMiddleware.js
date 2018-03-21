const user = require('../../models/users.server.model');
const Validator = require('jsonschema').Validator;
const globals = require('../../utilities/GlobalObjects');

exports.authenticateToken = function(req, res, next){
    let token = req.header('X-Authorization');
    user.findUserByToken(token)
        .then(() => next())
        .catch((reason) => res.status(reason.code).send(reason.message));
};

exports.checkOwnsAuction = function(req, res, next){
    let token = req.header('X-Authorization');
    let userId;
    user.findUserByToken(token)
        .then((result) => {
            userId = result.user_id;
            return user.findAuctionOwner(req.params.id);
        })
        .then((user) => {
            if (user.result[0] && user.result[0].auction_userid === userId){next()}
            else {res.status(globals.Unauthorized.code).send(globals.Unauthorized.message)}})
        .catch((reason) => console.log(reason));
};

exports.checkOwns = function(req, res, next){

};

exports.validateCreateAuctionJsonBody = function(req, res, next){
    let v = new Validator();
    let schema = auctionSchema(true);
    if (v.validate(req.body, schema).errors[0]) {res.status(globals.MalformedRequest.code).send(globals.MalformedRequest.message)}
    else {next()}
};

exports.validatePatchAuctionJsonBody = function(req, res, next){
    let v = new Validator();
    let schema = auctionSchema(false);
    if (v.validate(req.body, schema).errors[0]) {res.status(globals.MalformedRequest.code).send(globals.MalformedRequest.message)}
    else {next()}
};

exports.validateCreateUserJsonBody = function(req, res, next){
    let v = new Validator();
    let schema = userSchema(true);
    if (v.validate(req.body, schema).errors[0]) {res.status(globals.MalformedRequest.code).send(globals.MalformedRequest.message)}
    else {next()}

};

exports.validatePatchUserJsonBody = function(req, res, next){
    let v = new Validator();
    let schema = userSchema(false);
    if (v.validate(req.body, schema).errors[0]) {res.status(globals.MalformedRequest.code).send(globals.MalformedRequest.message)}
    else {next()}
};

function userSchema (required){
    return  {
        "type": "object",
        "properties" : {
            "username": {"type": "string", required : required},
            "givenName": {"type": "string", required : required},
            "familyName": {"type": "string", required : required},
            "email": {"type": "string", required : required, pattern: globals.EmailRegEx},
            "password": {"type": "string", required : required}
        }
    }
}

function auctionSchema (required){
    return {
        "type": "object",
        "properties" : {
            "categoryId" : {"type": "integer", required : required},
            "title" : {"type" : "string", required : required},
            "description": {"type": "string", required: required},
            "startDateTime" : {"type" : "integer", required : required},
            "endDateTime" : {"type" : "integer", required : required},
            "reservePrice" : {"type" : "integer", required : required},
            "startingBid" : {"type" : "integer", required : required}
        }
    };
}
