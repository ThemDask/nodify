var express = require('express');
var router = express.Router();
const session = require('express-session');


router.get('/', (req, res) => {

    var data = {
        token: req.session.token,
        name: req.session.name,
        profile_pic: req.session.profilepic,
        followers: req.session.followers
    }

    // console.log("tokenise data: " + data.name + "     " + data.token)
    res.send(data);

  })

module.exports = router;