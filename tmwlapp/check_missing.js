const fs = require('fs');

const artistsFile = 'C:/Users/Zsolt/Documents/GitHub/tomorrowlandapp/tmwlapp/assets/data/artist_images.json';
let artists = JSON.parse(fs.readFileSync(artistsFile, 'utf8'));

const missing = Object.keys(artists).filter(name => !artists[name]);
console.log(`Missing artists (${missing.length}):`, missing);
