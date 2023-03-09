var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var path = require('path');
const session = require('express-session');

// router.use(express.static(path.join(__dirname, '../static')));

router.get('/', (req, res) => {

    var data = {
        token: req.session.token,
        name: req.session.name
    }

    console.log("tokenise data: " + data.name + "     " + data.token)
    res.send(data);

    // res.sendFile(path.join(__dirname, '../static', 'dashboard.html'));

  })

module.exports = router;