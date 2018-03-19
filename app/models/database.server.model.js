const db = require('../../config/db');
const globals = require('../utilities/GlobalObjects');
const fs = require('fs');
const errors = require("mysql/lib/protocol/constants/errors");

const resetDatabaseSqlPath = "../hta55/app/scripts/db_setup.sql";
const reloadDatabaseSqlDataPath = "../hta55/app/scripts/db_resample.sql";
const ENCODING = "utf8";

exports.queryWithPromise = function(query, values){
    return new Promise((resolve, reject) =>{
        db.get_pool().query(query, values, (err, result) => {
            if (!err){
                resolve({info:globals.OK, result:result});
            } else {
                console.log(err);
                if( err.errno === errors.ER_DUP_ENTRY) { //duplicate
                    reject(globals.MalformedRequest);
                }
                if (err.errno === errors.ER_NO_REFERENCED_ROW_2){ //references
                    reject(globals.BadRequest)
                }
                else{
                    reject(globals.InternalServerError);
                }
            }
        });
    });
};

exports.reset = function(done){
    let query = fs.readFileSync(resetDatabaseSqlPath, ENCODING);
    db.get_pool().query(query, function (err){
        if (err) done (globals.MalformedRequest);
        else done(globals.OK);
    });
};

exports.resample = function(done){
    let query = fs.readFileSync(reloadDatabaseSqlDataPath, ENCODING);
    db.get_pool().query(query, function (err) {
       if (err) done (globals.MalformedRequest);
       else done (globals.OKCreated);
    });
};



