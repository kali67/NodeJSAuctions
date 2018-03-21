const express = require('express'),
bodyParser = require('body-parser'),
gloabls = require('../app/utilities/GlobalObjects');

module.exports = function(){
    const app = express();
    app.use(bodyParser.json({type: 'application/json'})); //use json on content type json (default to text otherwise)'

    app.use((err, req, res, next) => {
        if (err) {
            res.status(gloabls.BadRequest.code).send(gloabls.BadRequest.message);
        } else {
            next()
        }
    });

    require('../app/routes/auctions.server.routes.js')(app);
    require('../app/routes/photos.server.routes.js')(app);
    require('../app/routes/database.server.route.js')(app);
    require('../app/routes/users.server.routes.js')(app);
    return app;
};