var express = require('express');
var router = express.Router();
// var querystring = require('querystring');
var path = require('path');
// import getDashboard from '../service/dashboardService.js';

router.use(express.static(path.join(__dirname, '../static')));

router.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, '../static', 'dashboard.html'));

})

module.exports = router;