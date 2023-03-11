var express = require('express');
var router = express.Router();
// const session = require('express-session');
var querystring = require('querystring');
var request = require('request'); // "Request" library


// get current user's top items (songs, artists etc.)
router.get('/', (req, res) => {
    // get token from session
    token = req.session.token;
    console.log("MY TOKEN: " + token);
    var options = {
        url: 'https://api.spotify.com/v1/me/top/artists?'  +
        querystring.stringify({
            limit: 5,
            offset: 0,
            time_range: "short_term"
        }),
    
        headers: { 'Authorization': 'Bearer ' + token },
        json: true
      };
    
    request.get(options, function(error, response, body) {
        var artist = [];
        // var songName = [];

        for (i=0; i<5;i++) {
            artist[i] = body.items[i].name;
            console.log(artist[i]);
        }

        // console.log(body.items[1].name);
        // console.log(response.statusCode);
        
      }); 

  })

module.exports = router;