const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var helmet = require('helmet');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var config = require('./models/Config')
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser(config.cookiesKey));

// routes allowed for everyone
var auth = require('./routes/auth');
var user = require('./routes/user');
var test = require('./routes/test');


// routes allowed for standard user
var countryUser = require('./routes/user/country');
var userUser = require('./routes/user/user');

// routes allowed for admins
var countryAdmin = require('./routes/admin/country');
var userAdmin = require('./routes/admin/user');

// middlewares to manage access to different routes
var middlewareAdmin = require('./routes/admin/middleware');
var middlewareUser = require('./routes/user/middleware');

app.use(cors({credentials: true, origin: true}))

// prevent CORS problems
/*app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    next();
})*/

app.use(helmet());

// All access
app.use('/', auth);
app.use('/', user);
app.use('/', test);

app.use('/', middlewareUser) // Middleware for users

// Only standard user
app.use('/', countryUser);
app.use('/', userUser);

app.use('/', middlewareAdmin) // Middleware for admins

// Only admins
app.use('/', countryAdmin);
app.use('/', userAdmin);

// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(3001, function () {
    console.log('Node app is running on port 3001');
});