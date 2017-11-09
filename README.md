# liri-node-app

Liri is a Node.js app that utilizes Twitter, Spotify and Request NPM packages. It calls the Twitter, Spotify and/or IMDB APIs to retrieve information on the search terms the user enters.

To use this app, call the node file in the console, followed by two parameters. The first parameter will tell the app which action to perform on the second parameter.

First parameter:

- movie-this (Will return the top IMDB result from your search); 
- songify-this (Will return the top result from Spotify for your search); 
- do-what-it-says (Reads a text file and scans for the song name, which then searches Spotify)


Second parameter:

Search terms. *Be sure to enclose in quotes*

Example command:
node liri.js movie-this "The Waterboy" //Will return the details for the Adam Sandler movie "The Waterboy"
