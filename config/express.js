const express = require('express'),
bodyParser = require('body-parser');

module.exports = function(){
    const app = express();
    app.use(bodyParser.json());
   // require('../app/routes/auctions.server.routes.js')(app);
   // require('../app/routes/photos.server.routes.js')(app);
    require('../app/routes/database.server.route.js')(app);
    require('../app/routes/users.server.routes.js')(app);
    return app;
};