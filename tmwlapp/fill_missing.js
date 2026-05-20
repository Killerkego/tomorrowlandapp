const fs = require('fs');
const https = require('https');

const artistsFile = 'C:/Users/Zsolt/Documents/GitHub/tomorrowlandapp/tmwlapp/assets/data/artist_images.json';
let artists = JSON.parse(fs.readFileSync(artistsFile, 'utf8'));

// A list of good, high-quality Unsplash image IDs related to DJs, concerts, and electronic music
const fallbackImages = [
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&h=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbaf3a?q=80&w=400&h=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514525253361-bee243870eb2?q=80&w=400&h=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=400&h=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400&h=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=400&h=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=400&h=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=400&h=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=400&h=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&h=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=400&h=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?q=80&w=400&h=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1496293455970-f8581aae0e3c?q=80&w=400&h=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=400&h=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517230814606-2e33f0d5242f?q=80&w=400&h=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501612722273-ed835f8c679a?q=80&w=400&h=400&auto=format&fit=crop"
];

function fetchItunesImage(artistName) {
    return new Promise((resolve) => {
        // Clean up artist name further for iTunes
        let queryName = artistName.split(' F2F ')[0].split(' b2b ')[0].split(' (')[0].split(':')[0];
        const query = encodeURIComponent(queryName);
        
        https.get(`https://itunes.apple.com/search?term=${query}&entity=musicArtist&limit=1`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.results && parsed.results.length > 0 && parsed.results[0].artistLinkUrl) {
                         resolve(null); // iTunes API doesn't easily return artist photos directly in search, it returns amgArtistId.
                    } else {
                        resolve(null);
                    }
                } catch(e) { resolve(null); }
            });
        }).on('error', () => resolve(null));
    });
}

// Since iTunes API doesn't easily give direct artist images without scraping HTML, 
// and Deezer failed, we will assign random high-quality fallback images to the remaining 39.

const missing = Object.keys(artists).filter(name => !artists[name] || artists[name] === "");
let count = 0;

missing.forEach(name => {
    // Pick a random image from the fallback list
    const randomImage = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
    artists[name] = randomImage;
    count++;
});

fs.writeFileSync(artistsFile, JSON.stringify(artists, null, 2));
console.log(`Filled ${count} missing artists with high-quality festival placeholder images.`);
