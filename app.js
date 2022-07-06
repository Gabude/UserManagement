const express = require('express');
const {engine} = require('express-handlebars'); // updated to 6.0.X
const bodyParser = require('body-parser');  // Remove
const mysql = require('mysql'); // Remove

require('dotenv').config();

const app = express();
const port = process.env.PORT || 6001;

// Parsing middleware
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.urlencoded({extended: true})); // New

// Parse application/json
app.use(bodyParser.json());
//app.use(express.json()); // New

// Static Files
app.use(express.static('public'));

// Templating engine
 app.engine('hbs', engine({ extname: '.hbs' })); // v5.3.4
 app.set('view engine', 'hbs'); // v5.3.4

app.get('', (req, res) => { 
    res.render('home');
});


//Connection Pool
 //You don't need the connection here as we have it in userController
 let connection = mysql.createConnection({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_NAME
 });
 

 //Connect to the routes
 const routes = require('./server/routes/user');
 app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));