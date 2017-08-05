# Netflix++
Netflix rating add-on solution - Including Chrome & Firefox browser extensions

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
The OMDB API requires an API Key hence the need for the server app, I host it on a free Heroku instance and the code deployed is exactly what is in master, subtree **api/**.

## Constributing
All contributions are welcome, I wanted to make the plugin for my own usage but I also like OSS - So here we are!

## Future features
 - External links for more info
 - Secret Netflix categories
 - Anything!

# Developing

## Structure

api/ - Go application

**Heroku command:** git subtree push --prefix api heroku master

**Heroku force push if changes are being rejected** git push heroku \`git subtree split --prefix api master\`:master --force

