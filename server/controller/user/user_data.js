var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var request = require('request'); // "Request" library



router.get('/', (req, res) => {

    var token = req.session.token;

    let options = {
        url: 'https://api.spotify.com/v1/me/top/tracks?'  +
        querystring.stringify({
            limit: 50, 
            offset: 0,
            time_range: "long_term" 
        }),
    
        headers: { 'Authorization': 'Bearer ' + token },
        json: true
      };


      request.get(options, function(error, response, body) {
        // var genres = [];
        var ids = [];
        var popularities = [];
    
        for (i=0; i<50;i++) {
        //   genres[i] = body.items[i].name;

          ids[i] = body.items[i].id;
          popularities[i] = body.items[i].popularity;

        }

        var data = {popularities, ids};


        var profile = generate(data);

        res.json(data) // TODO return profile
        
      }); 

  })

module.exports = router;

 function generate(data) {
    return "ok";
}
