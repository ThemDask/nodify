var express = require('express');
var router = express.Router();
var querystring = require('querystring');

router.get('/', (req, res) => {
    var token = req.query.token;
    var name = req.query.name;
    res.send('I HAVE THE TOKEN: ' + token + "<br>" + "Name: " + name)
  })

module.exports = router;