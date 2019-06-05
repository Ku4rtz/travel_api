const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var helmet = require('helmet')
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// routes allowed for everyone
var auth = require('./routes/auth');
var user = require('./routes/user');

// routes allowed for standard user
var countryUser = require('./routes/user/country');
var userUser = require('./routes/user/user');

// routes allowed for admins
var countryAdmin = require('./routes/admin/country');
var userAdmin = require('./routes/admin/user');

// middlewares to manage access to different routes
var middlewareAdmin = require('./routes/admin/middleware');
var middlewareUser = require('./routes/user/middleware');

// prevent CORS problems
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    next();
})

app.use(helmet());

// All access
app.use('/', auth);
app.use('/', user);

// Only standard user
app.use('/', middlewareUser);
app.use('/', countryUser);
app.use('/', userUser);

// Only admins
app.use('/', middlewareAdmin);
app.use('/', countryAdmin);
app.use('/', userAdmin);

// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(3001, function () {
    console.log('Node app is running on port 3001');
});