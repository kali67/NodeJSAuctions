const db = require('../../config/db');
const globals = require('../utilities/GlobalObjects');
const fs = require('fs');

const resetDatabaseSqlPath = "./scripts/db_setup.sql";
const reloadDatabaseSqlDataPath = "./scripts/db_resample.sql";
const ENCODING = "utf8";

exports.queryWithPromise = function(query, values){
    return new Promise((resolve, reject) =>{
        db.get_pool().query(query, values, (err, result) => {
            if (!err){
                resolve({info:globals.OK, result:result});
            } else {
                console.log(err);
                reject(globals.BadRequest);
            }
        });
    });
};

exports.reset = function(done){
    let query = fs.readFileSync(resetDatabaseSqlPath, ENCODING);
    db.get_pool().query(query, function (err){
        if (err) done (400, "Malformed request.");
        else done(200, "OK");
    });
};

exports.resample = function(done){
    let query = fs.readFileSync(reloadDatabaseSqlDataPath, ENCODING);
    db.get_pool().query(query, function (err) {
       if (err) done (400, "Malformed request.");
       else done (201, "Sample of data has been reloaded.");
    });
};



