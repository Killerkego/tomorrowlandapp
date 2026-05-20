const fs = require('fs');
const https = require('https');

const artistsFile = 'C:/Users/Zsolt/Documents/GitHub/tomorrowlandapp/tmwlapp/assets/data/artist_images.json';
let artists = JSON.parse(fs.readFileSync(artistsFile, 'utf8'));

async function fetchDeezerImage(artistName) {
    return new Promise((resolve) => {
        // Clean up artist name for better search results (e.g., remove " b2b ", " & ", " feat ")
        let queryName = artistName.split(' b2b ')[0].split(' & ')[0].split(' feat ')[0].split(' presents ')[0];
        const query = encodeURIComponent(queryName);
        
        https.get(`https://api.deezer.com/search/artist?q=${query}`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.data && parsed.data.length > 0) {
                        resolve(parsed.data[0].picture_xl || parsed.data[0].picture_medium);
                    } else {
                        resolve(null);
                    }
                } catch(e) { resolve(null); }
            });
        }).on('error', () => resolve(null));
    });
}

async function updateImages() {
    console.log('Starting to fetch real artist images from Deezer API...');
    const keys = Object.keys(artists);
    let successCount = 0;
    
    for(let i = 0; i < keys.length; i++) {
        const name = keys[i];
        const imgUrl = await fetchDeezerImage(name);
        
        if (imgUrl) {
            artists[name] = imgUrl;
            successCount++;
        } else {
            artists[name] = ""; // Clear bad Unsplash links so it falls back to the local default
        }
        
        // Progress log every 50 artists
        if ((i + 1) % 50 === 0) {
            console.log(`Processed ${i + 1}/${keys.length}...`);
        }
        
        // Slight delay to respect API rate limits (Deezer is 50 req / 5 sec)
        await new Promise(r => setTimeout(r, 100)); 
    }
    
    fs.writeFileSync(artistsFile, JSON.stringify(artists, null, 2));
    console.log(`Done! Successfully updated ${successCount} out of ${keys.length} artists with real photos.`);
}

updateImages();
