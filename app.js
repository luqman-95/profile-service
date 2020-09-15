const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { responseFormatter, errorHandler } = require('./helpers/response-formatter');
const basicAuth = require('./helpers/basicAuth');
require('./helpers/databases/mongodb');

const app = express();


// Imports module
const r = {
    profile: require('./modules/profile/routes')
};

// App configuration and pre-middleware
app.set('x-powered-by', false);
app.use(express.json({ limit: '32mb' }));
app.use(express.urlencoded({ limit: '32mb', extended: false }));
app.use(cookieParser());
app.use(responseFormatter());

// Routing - Basic Auth
app.use('/profile', cors(), basicAuth(), r.profile.api);

// App post-middleware
app.use(errorHandler);

//Initiation

module.exports = app;