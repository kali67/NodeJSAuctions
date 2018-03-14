const users = require('../controllers/users.server.controller');

module.exports = function(app){
    app.route('/api/v1/users')
        .post(users.createUser);
    app.route('/api/v1/users/:id')
        .get(users.read);
    app.route('/api/v1/users/login')
        .post(users.authenticateUser); //dont want to authenticate token here
    //app.route('/api/v1/users/logout')
        
    //     .put(users.update); //TODO: check if put or patch
    // app.route('users/login')
    //     .post(users.login);
    // app.route('users/logout')
    //     .post(users.logout);
};