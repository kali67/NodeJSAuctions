const db = require('../../config/db');
const globals = require('../utilities/GlobalObjects');
const fs = require('fs');

const resetDatabaseSqlPath = "../hta55/app/scripts/db_setup.sql";
const reloadDatabaseSqlDataPath = "../hta55/app/scripts/db_resample.sql";
const ENCODING = "utf8";

exports.queryWithPromise = function(query, values){
    return new Promise((resolve, reject) =>{
        db.get_pool().query(query, values, (err, result) => {
            if (!err){
                //console.log(result);
                resolve({info:globals.OK, result:result});
            } else {
                console.log(err);
                if( err.Error === Error.ER_DUP_ENTRY) {
                    reject(globals.MalformedRequest);
                }
                else{
                    reject(globals.BadRequest);
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



