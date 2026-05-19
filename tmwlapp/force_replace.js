const fs = require('fs');

const artistsFile = 'C:/Users/Zsolt/Documents/GitHub/tomorrowlandapp/tmwlapp/assets/data/artist_images.json';
let artists = JSON.parse(fs.readFileSync(artistsFile, 'utf8'));

// High-quality DJ/Festival placeholders from Unsplash
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

let replacedCount = 0;
for (const artist in artists) {
    const url = artists[artist];
    // Szigorú csere: ha egyáltalán az "üres" sablon (d41d8cd98) VAGY BÁRMILYEN Deezer link,
    // lecseréljük egy garantáltan jó Unsplash képre. A Deezer API túl sok hamis találatot adott.
    if (url.includes('cdn-images.dzcdn.net')) {
        const randomImage = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
        artists[artist] = randomImage;
        replacedCount++;
    }
}

fs.writeFileSync(artistsFile, JSON.stringify(artists, null, 2));
console.log(`Successfully replaced ${replacedCount} Deezer links with guaranteed high-quality Unsplash festival images.`);
