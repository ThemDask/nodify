var express = require('express');
var router = express.Router();
const session = require('express-session');


router.get('/', (req, res) => {

    var data = {
        token: req.session.token,
        name: req.session.name
    }

    console.log("tokenise data: " + data.name + "     " + data.token)
    res.send(data);

  })

module.exports = router;