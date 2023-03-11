var express = require('express');
var router = express.Router();
var path = require('path');

router.use(express.static(path.join(__dirname, '../../static')));

router.get('/', (req, res) => {
    console.log(req.session.token)
    res.sendFile(path.join(__dirname, '../../static', 'dashboard.html'));

})

module.exports = router;