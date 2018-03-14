const User = require('../models/users.server.model');
const databaseHelper = require('../models/database.server.model');

exports.createUser = function (req, res) {
    let values = [
        [req.body.username], [req.body.givenname], [req.body.familyname],
        [req.body.email],[req.body.password]
    ];
    User.createUser(values)
        .then((result) => res.send(result))
        .catch((reason => res.status(reason.code).send(reason.message)));

};

exports.read = function(req, res){
    let values = [[req.header('X-Authorization')]];
    let sql = "select user_id from auction_user where user_token = ?";
    databaseHelper.queryWithPromise(sql,values)
        .then((result) => User.getUserData(result, req.params.id)) //getUserData returns a promise
        .then((data) => res.status(data.info.code).send(data.result[0]))
        .catch((reason) => res.status(reason.code).send(reason.message));
};

exports.authenticateUser = function(req, res){
    let username = req.query.username;
    let email = req.query.email;
    let password = req.query.password;
    User.checkLogin(username, email, password)
        .then((result)=> res.status(result[0].res.code).send(result[0].data))
        .catch((reason => res.status(reason.code).send(reason.message)));
};



//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoic3VwZXJtYW4iLCJpYXQiOjE1MjA3MzQ4NDV9.QBKReXptzAFAVfTurTd7PGAZdz82o8ww9g4bW7vF43Q
exports.verifyToken = function(req, res, next) {
    var token = req.get('X-Authorization');
    User.findUserByToken(token)
        .then()
        .catch()
    if (token) {
        User.findToken(token, function (exists) {
            if (!exists){ //token not in db
                res.status(401).send({message: "unauthorised"});
            } else {
                next();
            }
        });
    }
    else {
        res.status(403).send({
            message: 'No token provided.'
        });
    }
};