const fs = require('fs');

const artistsFile = 'C:/Users/Zsolt/Documents/GitHub/tomorrowlandapp/tmwlapp/assets/data/artist_images.json';
let artists = JSON.parse(fs.readFileSync(artistsFile, 'utf8'));

let clearedCount = 0;
for (const artist in artists) {
    const url = artists[artist];
    // If it's an unsplash URL (used in the fill_missing scripts) OR the specific Deezer placeholder
    if (!url || url.includes('unsplash.com') || url.includes('d41d8cd98f00b204e9800998ecf8427e')) {
        artists[artist] = "";
        clearedCount++;
    }
}

fs.writeFileSync(artistsFile, JSON.stringify(artists, null, 2));
console.log(`Cleared ${clearedCount} images so they will use the local fallback.`);
