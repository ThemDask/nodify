var express = require('express');
var router = express.Router();
var path = require('path');

router.use(express.static(path.join(__dirname, '../../static')));

router.get('/', (req, res) => {
    console.log("in endpoint")
    // res.send
    res.sendFile(path.join(__dirname, '../../static', 'statistics.html'));

})

module.exports = router;