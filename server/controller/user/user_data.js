var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var request = require('request'); // "Request" library



router.get('/', (req, res) => {

    var token = req.session.token;

    let tracks_options = {
        url: 'https://api.spotify.com/v1/me/top/tracks?'  +
        querystring.stringify({
            limit: 50, 
            offset: 0,
            time_range: "long_term" 
        }),
    
        headers: { 'Authorization': 'Bearer ' + token },
        json: true
      };

      // get ids and popularity of user's top 50 tracks
      request.get(tracks_options, function(error, response, body) {
        let ids = [];
        let popularities = [];
    
        for (i=0; i<50;i++) {
          ids[i] = body.items[i].id;
          popularities[i] = body.items[i].popularity;
        }

        let ids_string = ids[0];
        for (i=1; i<50;i++) {
          ids_string = ids_string + "," + ids[i];
        }

        let audio_features_options = {
          url: 'https://api.spotify.com/v1/audio-features?'  +
          querystring.stringify({
              ids: ids_string 
          }),
          headers: { 'Authorization': 'Bearer ' + token },
          json: true
        };

        // get audio features of 50 tracks using their ids
        request.get(audio_features_options, function(error, response, body) {
          console.log(body);
          let danceability = [];
          let tempo = [];
          let energy = [];
          let speechiness = [];
          let liveness = [];
          let loudness = [];

          for (i=0; i<50;i++) {
            danceability[i] = body.audio_features[i].danceability;
            tempo[i] = body.audio_features[i].tempo;
            energy[i] = body.audio_features[i].energy;
            speechiness[i] = body.audio_features[i].speechiness;
            liveness[i] = body.audio_features[i].liveness;
            loudness[i] = body.audio_features[i].loudness;
          }

          let track_data = {popularities, danceability, tempo, energy, speechiness,liveness,loudness};

           // send gathered data to analyze and generate a user profile
          let profile = analyze(track_data);
          res.json(profile)
        });
      }); 

  })

module.exports = router;

// helper function to analyze gathered data
// TODO: need to rewrite this mess
function analyze(data) {
  let popularity = 0;
  let danceability = 0;
  let tempo = 0;
  let energy = 0;
  let speechiness = 0;
  let liveness = 0;
  let loudness = 0;

  // get average values
  for (i=0;i<50;i++) {
    popularity += data.popularities[i] 
    danceability += data.danceability[i]
    tempo += data.tempo[i]
    energy += data.energy[i]
    speechiness += data.speechiness[i]
    liveness += data.liveness[i]
    loudness += data.loudness[i]

  }
  popularity = popularity/50;
  danceability = danceability/50;
  tempo = tempo/50;
  energy = energy/50;
  speechiness = speechiness/50;
  liveness = liveness/50;
  loudness = loudness/50;
  
  // get a user profile accooridng to user's data
  const values = {popularity,danceability,tempo,energy,speechiness,liveness,loudness } 
  // console.log(values) 

  let profile = "default"
  if (values.popularity > 50) {
    console.log("You're a jock!");
    profile = "Jock";

  } else if (values.danceability > 0.7) {
    console.log("You're a dancer!");
    profile = "dancer";

  } else if (values.speechiness > 0.5){
    console.log("You love to sing!");
    profile = "singer";

  } else if (values.tempo >= 120) {
    console.log("You're a Raver!");
    profile = "raver";

  } else if (values.loudness > 0){
    console.log("You like LOUD music!");
    profile = "loud";

  } else if (values.liveness > 0.5) {
    console.log("You're ALIVE with music!");
    profile = "alive";

  } else  {
    console.log("You listen to music!");
  }

  return profile;
}
