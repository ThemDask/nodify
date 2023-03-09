const request = require('request'); // "Request" library
const express = require('express')
const app = express()
const port = 3000
const path = require('path');

var cors = require("cors");

// declare endpoints
var sanityRouter = require('./controller/sanity');
var callbackRouter = require('./controller/callback');
var authenticateRouter = require('./controller/authenticate');
var tokeniseRouter = require('./controller/tokenise');
var homeRouter = require('./controller/home');
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


const session = require('express-session');

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

// declare router
app.use('/', sanityRouter);
app.use('/callback', callbackRouter);
app.use('/authenticate', authenticateRouter);
app.use('/tokenise', tokeniseRouter); 
app.use('/home', homeRouter);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`)
})

module.exports = app;