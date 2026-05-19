const fs = require('fs');

const artistsFile = 'C:/Users/Zsolt/Documents/GitHub/tomorrowlandapp/tmwlapp/assets/data/artist_images.json';
let artists = JSON.parse(fs.readFileSync(artistsFile, 'utf8'));

const urlCounts = {};
for (const artist in artists) {
    const url = artists[artist];
    urlCounts[url] = (urlCounts[url] || 0) + 1;
}

const sortedUrls = Object.entries(urlCounts).sort((a, b) => b[1] - a[1]);
console.log("Top 20 most frequent URLs:");
for (let i = 0; i < 20; i++) {
    if (sortedUrls[i] && sortedUrls[i][1] > 1) {
        console.log(`${sortedUrls[i][1]} times: ${sortedUrls[i][0]}`);
    }
}
