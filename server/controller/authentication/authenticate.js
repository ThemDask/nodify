var client_id = 'bfe7bf3e08b9474092cc13414ec1d09d';
var redirect_uri = 'http://localhost:3000/callback';

var request = require('request'); // "Request" library
var express = require('express');
var router = express.Router();
var querystring = require('querystring');

router.get('/', (req, res) => {

  var state = '1231231231231231';
  var scope = 'user-read-private user-read-email user-top-read';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
      show_dialog: false
    }));
});

module.exports = router;