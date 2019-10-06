require("dotenv").config();
// var keys = require("./keys.js");
// var spotify = keys.spotify;
let axios = require("axios");
let fs = require("fs");
// let moment = require("moment.js")
let search = process.argv[2];
let term = process.argv.slice(3).join("+");
if (search === "spotify-this"){
    songSearch();
} else if (search === "concert-this"){
    townSearch();
} else if (search === "movie-this"){
    movieSearch();
}
function townSearch() {
    var URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp"

    axios.get(URL).then(function(response) {
        
        for (i = 0; i < response.length; i++){
            console.log(response[i].venue.city)
            console.log(response[i].datetime)
        }

            })   
    }


       



function movieSearch() {
    var URL = "https://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy"
    axios.get(URL).then(function(response){
        console.log("Title: " + response.data.Title + "\nYear: " + response.data.Year + 
        "\nIMDB Rating: " + response.data.Ratings[0].Value + "\nRotten Tomatoes Rating: "
         + response.data.Ratings[1].Value + "\nCountry: " + response.data.Country + 
         "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot +
        "\nActors: " + response.data.Actors)
         fs.appendFile("LIRI.txt", response, function(err) {
        if (err) throw err;

      });
    })
   
};
function songSearch() {
    var URL = 'https://api.spotify.com/v1/search?query=' + term + '&type=song'

    axios({
        url: URL,
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + 'BQAenEoVdps-iQbEv2NIhS5IrZ-ocbHJRRe2Nu53NjExfyV1L86-lE89jdCWyXx0KDAOl9MhUpuKFRyXJRZ7H3GtUacOtDGZDL4YyPu-N2mK2fcIE8ULlG73SQrEOktvyk4n1PtV18xGFgrp_4niUzKP86fhI-0'
        }
    }).then(function(response) {
      
      var jsonData = response.data.tracks.items[t];
        console.log(response.data)
      
      var songData = [
        console.log("Artist: " + jsonData.artists[0].name),
        "Title: " + jsonData.name,
        "Album: " + jsonData.album.name,
        "Preview: " + jsonData.preview_url
      ].join("\n");

      
      fs.appendFile("LIRI.txt", songData, function(err) {
        if (err) throw err;

      });
    });
}