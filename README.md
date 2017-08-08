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

## Golang API
api/ - Go application

**npm** npm run build || npm run watch || npm run release

**Heroku command:** git subtree push --prefix api heroku master

**Heroku force push if changes are being rejected** git push heroku \`git subtree split --prefix api master\`:master --force

## Browser Extensions

### Chrome

1. Go to URL: `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked extension**
4. Select `extension`

### Firefox

1. Go to URL: `about:debugging#addons`
2. Click **Load Temporary Add-on**
3. Select `extension/manifest.json`