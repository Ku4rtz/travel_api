const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// prevent CORS problems
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    next();
})
 
// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'travel_memories',
	port: 3306,
});
 
// connect to database
mc.connect();
 
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'Aucune data à récupérer' })
});
 
// Retrieve all countries 
app.get('/countries', function (req, res) {
    mc.query('SELECT * FROM country', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Countries list' });
    });
});
 
// Search for country with keyword in their name
app.get('/country/search/:keyword', function (req, res) {
    let keyword = req.params.keyword;
    mc.query("SELECT * FROM country WHERE name_fr LIKE ? ", ['%' + keyword + '%'], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Countries search list.' });
    });
});
 
// Retrieve country with id 
app.get('/country/:id', function (req, res) {
 
    let country_id = req.params.id;
 
    mc.query('SELECT * FROM country where id=?', country_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Countries list.' });
    });
 
});
 
// Add a new country 
app.post('/country', function (req, res) {
 
    let country = req.body.country;
 
    if (!country) {
        return res.status(400).send({ error:true, message: 'Please provide country' });
    }
 
    mc.query("INSERT INTO country SET ? ", country, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New country has been created successfully.' });
    });
});
 
//  Update country with id
app.put('/country', function (req, res) {
 
    let country_id = req.body.id;
    let country = req.body.country;
 
    if (!country_id || !task) {
        return res.status(400).send({ error: task, message: 'Please provide country and country_id' });
    }
 
    mc.query("UPDATE country SET country = ? WHERE id = ?", [country, country_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Country has been updated successfully.' });
    });
});
 
//  Delete country
app.delete('/country/:id', function (req, res) {
 
    let country_id = req.params.id;
 
    mc.query('DELETE FROM country WHERE id = ?', [country_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Country has been deleted successfully.' });
    });
 
});

/*router.post('/register', function(req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create({    name : req.body.name,    email : req.body.email,    password : hashedPassword  },  function (err, user) {    
        if (err) return res.status(500).send("There was a problem registering the user.")
        var token = jwt.sign({ id: user._id }, config.secret, {      expiresIn: 86400     }); // expires in 24 hours
        res.status(200).send({ auth: true, token: token });  }); })*/
 
// all other requests redirect to 404
app.all("*", function (req, res, next) {
    return res.send('page not found');
    next();
});
 
// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(3001, function () {
    console.log('Node app is running on port 3001');
});
 
// allows "grunt dev" to create a development server with livereload
module.exports = app;