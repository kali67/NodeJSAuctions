const db = require('../models/database.server.model');

exports.reset = function(req, res){
    db.reset(function(status){
        res.status(status.code).json(status.message);
    });
};

exports.resample = function(req, res){
    db.resample(function(status){
        res.status(status.code).json(status.message);
    });
};