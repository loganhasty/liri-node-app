//Require node packages to run the application
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var getKeys = require('./keys.js');
var fs = require('fs');
//Store the twitter keys and tokens in 'keys' variable
var keys = getKeys.twitterKeys;

//Store user input into variables
var command = process.argv[2];
var searchTerms = process.argv[3];


//Twitter functionality
//---------------------------------------------
var client = new twitter({
  consumer_key: getKeys.twitterKeys.consumer_key,
  consumer_secret: getKeys.twitterKeys.consumer_secret,
  access_token_key: getKeys.twitterKeys.access_token_key,
  access_token_secret: getKeys.twitterKeys.access_token_secret
});
 
var params = {screen_name: 'CodeBoss25'};
if (command === "my-tweets"){
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        console.log("\nLogan's Tweets: \n");
        for (var i = 0; i < tweets.length; i++){
            if ((!error) && (command = "my-tweets")) {
                console.log(`${tweets[i].created_at} \n ${tweets[i].text} \n`);
            }
        };
    });
};
//----------------------------------------------

//Spotify functionality

//----------------------------------------------
var spotify = new Spotify({
  id: '308d7b3be6904c5c9c9f2ed6c365c700',
  secret: '1cdfba8c40a84565ba0cc3615f3bb2bc'
});


if (command === "spotify-this-song"){
    spotify.search(
        { type: 'track', 
        query: searchTerms, 
        limit: 1 }, function(err, data) {
            if (!err){
                console.log("\n" + data.tracks.items[0].name);
                console.log(data.tracks.items[0].artists[0].name);
                console.log(data.tracks.items[0].preview_url);
                console.log(data.tracks.items[0].album.name + "\n");
            } else {
                console.log("Error! Try again.\nDeafult song: 'I Saw the Sign' by Ace of Base");
            }
        });
};

//----------------------------------------

//OMDB Functionality
//----------------------------------------

if (command === "movie-this"){
    var queryUrl = `http://www.omdbapi.com/?apikey=40e9cece&t="${searchTerms}`;
    request(queryUrl, function (error, response, body) {
        console.log(`\n
        Title: ${JSON.parse(body).Title}
        Year Released: ${JSON.parse(body).Year}
        IMDB Rating: ${JSON.parse(body).Ratings[0].Value}
        Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}
        Country: ${JSON.parse(body).Country}
        Language: ${JSON.parse(body).Language}
        Plot: ${JSON.parse(body).Plot}
        Actors: ${JSON.parse(body).Actors}
        `);
    });
};

if (command === "do-what-it-says"){
    fs.readFile("./random.txt", "utf-8", function(err, data){
    if (err) {
        console.log(err);
    }
    parsedData = data.split(",");
    command = parsedData[0];
    searchTerms = parsedData[1];
    });
};