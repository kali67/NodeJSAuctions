const jwt = require('jsonwebtoken');

exports.createToken = function(userId, username){
    return jwt.sign({userId: userId, username: username}, "supersecretkey");
};
