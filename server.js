const express = require('express');
const app = express();
const bodyParser = require('body-parser');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var country = require('./routes/country');
var user = require('./routes/user');
var auth = require('./routes/auth');
var middleware = require('./routes/middleware');

// prevent CORS problems
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    next();
})

app.use('/', auth);

app.use('/', middleware);
app.use('/', country);
app.use('/', user);
 
// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(3001, function () {
    console.log('Node app is running on port 3001');
});