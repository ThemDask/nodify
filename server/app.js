const request = require('request'); 
const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const session = require('express-session');

var cors = require("cors");
require('dotenv').config();

// ***************************************************** //
// ***************** declare endpoints ***************** //
// ***************************************************** //

var sanityRouter = require('./controller/sanity');

// authentication endpoints
var callbackRouter = require('./controller/authentication/callback');
var authenticateRouter = require('./controller/authentication/authenticate');
var tokeniseRouter = require('./controller/authentication/tokenise');

// dashboard endpoints
var homeRouter = require('./controller/dashboard/home');
var statisticsRouter = require('./controller/dashboard/statistics');

// user endpoints
var userDetailsRouter = require('./controller/user/user_details');


// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// logger middleware
const time = Date.now();
const datetime = new Date(time);

function logger(req, res, next) {
    console.log(`[${datetime.toUTCString()}] ${req.method} ${req.url}`);
    next(); // dont get stuck in the middleware
}

app.use(logger);




// Configure session middleware
app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: true
}));

// static setup
// app.use('/static', express.static(path.join(__dirname, 'static')));

//cross-origin requests
app.use(cors());

// ***************************************************** //
// ****************** declare router  ****************** //
// ***************************************************** //

app.use('/sanity', sanityRouter);
app.use('/callback', callbackRouter);
app.use('/', authenticateRouter);
app.use('/tokenise', tokeniseRouter); 
app.use('/home', homeRouter);
app.use('/user_details', userDetailsRouter);
app.use('/statistics', statisticsRouter);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`)
})

module.exports = app;