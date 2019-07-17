const express = require('express');
const app = express();
let helmet = require('helmet');
let bodyParser = require('body-parser');
let cors = require('cors');
let cookieParser = require('cookie-parser');
let config = require('./models/Config');
let mongoose = require('mongoose');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb+srv://CHARLAT:184628Stebest@cluster0-rbzrl.mongodb.net/travel_memories?retryWrites=true&w=majority')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error(err));

app.use(cookieParser(config.cookiesKey));

// routes allowed for everyone
let auth = require('./routes/auth');
let user = require('./routes/user');
let checktoken = require('./routes/checktoken');
let test = require('./routes/test');

// routes allowed for standard user
let countryUser = require('./routes/user/country');
let userUser = require('./routes/user/user');

// routes allowed for admins
let countryAdmin = require('./routes/admin/country');
let userAdmin = require('./routes/admin/user');

// middlewares to manage access to different routes
let middlewareAdmin = require('./routes/admin/middleware');
let middlewareUser = require('./routes/user/middleware');

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
app.use('/', checktoken);
app.use('/', test);

app.use('/', middlewareUser) // Middleware for users

// Only standard user
app.use('/', countryUser);
app.use('/', userUser);

app.use('/', middlewareAdmin); // Middleware for admins

// Only admins
app.use('/', countryAdmin);
app.use('/', userAdmin);

// Port is 3001
app.listen(3001, function () {
    console.log('Node app is running on port 3001');
});