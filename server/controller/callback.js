const url = require('url');
var express = require('express');
var router = express.Router();
var request = require('request'); // "Request" library
var querystring = require('querystring');

var client_id = 'bfe7bf3e08b9474092cc13414ec1d09d';
var client_secret = '098bb3063eea4184a5b99020b5b97edf'

router.get('/', (req, res) => {

  var code = req.query.code || null;
  var state = req.query.state || null;
  console.log("code: " + code)
  var redirect_uri = 'http://localhost:3000/callback';
  if (state === null) {
    // res.redirect('/#' +
    //   querystring.stringify({
    //     error: 'state_mismatch'
    //   }));
    console.log("NO STATE IN PARAMETERS")
  } else {
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    // POST REQUEST TO TRADE CODE WITH ACCESS TOKEN
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        let access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          const name = body["display_name"] 
          console.log(body)
          // console.log(name)
          // console.log("access_token:" + access_token)
          res.redirect('http://localhost:3000/tokenise?' +
          querystring.stringify({
            name: name,
            token: access_token
          }))
        });

        // RETURNS
        // {
        //   country: 'GR',
        //   display_name: 'Themos Daskalopoulos',
        //   email: 'themosd@gmail.com',
        //   explicit_content: { filter_enabled: false, filter_locked: false },
        //   external_urls: {
        //     spotify: 'https://open.spotify.com/user/21tfbbcf5uyjuam5jwixdddtq'
        //   },
        //   followers: { href: null, total: 29 },
        //   href: 'https://api.spotify.com/v1/users/21tfbbcf5uyjuam5jwixdddtq',
        //   id: '21tfbbcf5uyjuam5jwixdddtq',
        //   images: [
        //     {
        //       height: null,
        //       url: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=747332628631663&height=300&width=300&ext=1680020102&hash=AeT_uzvRiSCFtHv3-wg',
        //       width: null
        //     }
        //   ],
        //   product: 'premium',
        //   type: 'user',
        //   uri: 'spotify:user:21tfbbcf5uyjuam5jwixdddtq'
        // }

        
        // we can also pass the token to the browser to make requests from there
        // res.redirect('/#' +
        //   querystring.stringify({
        //     access_token: access_token,
        //     refresh_token: refresh_token
        //   }));
      } 
      // else {
      //   res.redirect('/#' +
      //     querystring.stringify({
      //       error: 'invalid_token'
      //     }));
      // }
    });
  }
});

module.exports = router;



