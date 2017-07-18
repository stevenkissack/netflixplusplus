# Netflix++
Netflix rating add-on solution - Including a Chrome browser extension

## Architecture

### Chrome Extension
Standard JS plugin
 - Uses MutatuinObservers
 - Caches for sessions duration (avoids the issue of stale ratings)

### Server
Golang backend serving API request calls
 - Caches to limit 3rd party thrashing
 - Uses OMDB database
 - 

### Deployment
The OMDB API requires an API Key hence the need for the server app, I host it on a free Heroku instance and the code deployed is exactly what is in master.

## Constributing
All contributions are welcome, I wanted to make the plugin for my own usage but I also like OSS - So here we are!

## Future features
 - Other rating platforms
 - External IMDB links
 - Secret categories
 - Anything!
