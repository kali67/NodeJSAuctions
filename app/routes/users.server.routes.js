const users = require('../controllers/users.server.controller');
const lib = require('../lib/middleware/authMiddleware');

module.exports = function(app){
    app.route('/api/v1/users')
        .post(users.createUser);
    app.route('/api/v1/users/:id')
        .get(users.read);
    app.route('/api/v1/users/login')
        .post(users.authenticateUser);
    app.route('/api/v1/users/logout')
        .post(lib.authenticateToken, users.logout);
    app.route('/api/v1/users/:id')
        .patch(lib.authenticateToken, users.patchUser);
};