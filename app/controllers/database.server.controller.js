const db = require('../models/database.server.model');

exports.reset = function(req, res){
    db.reset(function(statuscode, message){
        res.json(statuscode + ": " + message);
    });
};

exports.resample = function(req, res){
    db.resample(function(statuscode, message){
        res.json(statuscode + ": " + message);
    });
};