var express = require('express');
var router = express.Router();
// const session = require('express-session');
var querystring = require('querystring');
var request = require('request'); // "Request" library


// get current user's top items (songs, artists etc.)
router.get('/?type/:type/time_range/:time_range', (req, res) => {
    // get token from session
    token = req.session.token;

    var item_type = req.params.type;// songs or artists 
    var item_time_range = req.params.time_range; // time range

    var options_artists = {
        url: 'https://api.spotify.com/v1/me/top/artists?'  +
        querystring.stringify({
            limit: 5, 
            offset: 0,
            time_range: item_time_range // TODO add time range as variable
        }),
    
        headers: { 'Authorization': 'Bearer ' + token },
        json: true
      };

      var options_tracks = {
        url: 'https://api.spotify.com/v1/me/top/tracks?'  +
        querystring.stringify({
            limit: 5, 
            offset: 0,
            time_range: item_time_range // TODO add time range as variable
        }),
    
        headers: { 'Authorization': 'Bearer ' + token },
        json: true
      };

    if (item_type == "artists") {
      var options = options_artists
    } else if (item_type == "tracks") {
      var options = options_tracks
    } else {return res.status(400).send({ // ERROR
      message: 'This is an error!'
        });
    } 

    request.get(options, function(error, response, body) {
        var items = [];
        // var songName = [];

        for (i=0; i<5;i++) {
          items[i] = body.items[i].name;
            // console.log(artists[i]);
        }
        res.json(items)
        // console.log(body.items[1].name);
        // console.log(response.statusCode);
        
      }); 


  })

module.exports = router;