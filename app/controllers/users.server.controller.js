const User = require('../models/users.server.model');
const databaseHelper = require('../models/database.server.model');

exports.createUser = function (req, res) {
    let values = [[req.body.username], [req.body.givenName],
        [req.body.familyName], [req.body.email],[req.body.password]];
    User.createUser(values)
        .then((result) => res.status(result.info.code).json(result.result))
        .catch((reason) => res.status(reason.code).json(reason.message));
};

exports.read = function(req, res){
    let values = [[req.header('X-Authorization')]];
    let sql = "select user_id from auction_user where user_token = ?";
    databaseHelper.queryWithPromise(sql,values)
        .then((result) => User.getUserData(result, req.params.id)) //getUserData returns a promise
        .then((data) => res.status(data.info.code).json(data.result[0]))
        .catch((reason) => res.status(reason.code).json(reason.message));
};

exports.authenticateUser = function(req, res){
    let username = req.query.username;
    let email = req.query.email;
    let password = req.query.password;
    User.checkLogin(username, email, password)
        .then((result)=> res.status(result[0].res.code).json(result[0].data))
        .catch((reason => res.status(reason.code).json(reason.message)));
};

exports.logout = function(req, res) {
    let token = req.get('X-Authorization');
    User.findUserByToken(token)
        .then((user) => User.removeTokenFromUser(user))
        .then((result) => {res.status(result.code).json(result.message)})
        .catch((reason) => res.status(reason.code).json(reason.message));
};

exports.patchUser = function(req, res){
    User.patchUser(req.body, req.params.id, req.header('X-Authorization'))
        .then((result) => res.status(result.code).json(result.message))
        .catch((reason) => res.status(reason.code).json(reason.message));
};
