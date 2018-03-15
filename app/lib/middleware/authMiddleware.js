const user = require('../../models/users.server.model');


exports.authenticateToken = function(req, res, next){
    let token = req.header('X-Authorization');
    user.findUserByToken(token)
        .then(() => next())
        .catch((reason) => res.status(reason.code).send(reason.message));
};