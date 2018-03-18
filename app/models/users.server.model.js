const databaseHelper = require('../models/database.server.model');
const globals = require('../utilities/GlobalObjects');

function authenticateUser (data, password) {
    let query = "update auction_user set user_token = (?) where user_id = ?";
    if (data.result[0]) {
        let userId = data.result[0].user_id;
        if (data.result[0].user_password !== password) {
            return Promise.reject(globals.UnauthorizedLogin);
        } else {
            let token = globals.token;
            return databaseHelper.queryWithPromise(query,[[token],[userId]])
                .then((result) => {
                    return Promise.resolve({res:result.info, data:{id:userId, token:token}})}) //TODO:
                .catch((reason) => {return Promise.reject(reason.info)});
        }
    } else{
        return Promise.reject(globals.UnauthorizedLogin);
    }
}

exports.checkLogin = function(username, email, password){
    let query = "select * from auction_user where user_email = '" + email + "'";
    if (username) {
        query = "select * from auction_user where user_username = '" + username + "'";
    }
    let promise = databaseHelper.queryWithPromise(query)
        .then((user) => authenticateUser(user, password))
        .catch((reason => {return Promise.reject(reason)}));
    return Promise.all([promise]);
};

function getMaxIdUser(){
    return databaseHelper.queryWithPromise("select MAX(user_id) as user_id from auction_user")
        .then((result) => {return Promise.resolve(result.result[0])})
        .catch((reason) => {return Promise.reject(reason)});
}

exports.createUser = function(values){
    let sql = "insert into auction_user (user_username, user_givenname, user_familyname, user_email, user_password)" +
        "values (?,?,?,?,?)";
    return databaseHelper.queryWithPromise(sql, values)
        .then(() => getMaxIdUser())
        .then((result) => {return Promise.resolve({info:globals.OKCreated, result:{id:result.user_id}})})
        .catch((reason) => {return Promise.reject(reason)});
};

exports.getUserData = function(responseData, userTwo){
    let userOne = "";
    if (responseData.result[0]){
         userOne = responseData.result[0].user_id;
    }
    let sql = "select user_username as username, user_givenname as givenName, user_familyname as familyName " +
        "from auction_user where user_id = ?";
    if (userOne.toString() === userTwo.toString()){
        sql = "select user_username as username, user_givenname as givenName, user_familyname as familyName, " +
            "user_email as email, user_accountbalance as accountbalance" +
            " from auction_user where user_id = ?";
    }
    return databaseHelper.queryWithPromise(sql, [[userTwo]])
        .then((data) => {
            if (data.result[0]){return Promise.resolve(data)}
            else {return Promise.reject(globals.NotFoundRequest)}
        },() => {return Promise.reject(globals.MalformedRequest)});
};

exports.findUserByToken = function (token) {
    let sql = "select user_id from auction_user where user_token = ?";
    return databaseHelper.queryWithPromise(sql, [[token]])
        .then((user) => {
            if (user.result[0]){return Promise.resolve(user)}
            else {return Promise.reject(globals.Unauthorized)}
        },(reason) => {return Promise.reject(reason)});
};

exports.removeTokenFromUser = function (user) {
    let values = [[user.result[0].user_id]];
    let sql = "update auction_user set user_token = 'null' where user_id = ?";
    return databaseHelper.queryWithPromise(sql, values)
        .then((result) => {console.log(result);return Promise.resolve(globals.OK)})
        .catch(() => {return Promise.reject(globals.InternalServerError)})
};

exports.patchUser = function(requestBody, userId){
    let query = "update auction_user set ";
    let condition = "";
    if (requestBody.username) condition += ",user_username = '" + requestBody.username + "'";
    if (requestBody.givenName) condition += ", user_givenname = '" + requestBody.givenName + "'";
    if (requestBody.familyName) condition += ", user_familyname = '" + requestBody.familyName + "'";
    if (requestBody.email) condition += ", user_email = '" + requestBody.email + "'";
    if (requestBody.password) condition += ", user_password = '" + requestBody.password + "'";
    condition = condition.substring(1);
    query = query + condition + " where user_id = " + userId;
    return databaseHelper.queryWithPromise(query)
        .then(() => {return Promise.resolve(globals.OKCreated)});
};

