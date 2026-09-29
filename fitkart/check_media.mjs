import { exerciseLibrary } from './src/data/workouts.js';

console.log('Total exercises:', exerciseLibrary.length);
const missingVideo = [];
const missingImages = [];
const videoMap = new Map();

exerciseLibrary.forEach((ex, i) => {
  if (!ex.videoUrl || !ex.videoUrl.includes('youtube.com/embed/')) {
    missingVideo.push({ i, id: ex.id, name: ex.name, videoUrl: ex.videoUrl });
  } else {
    const match = ex.videoUrl.match(/embed\/([a-zA-Z0-9_-]+)/);
    if (match) {
      const vid = match[1];
      if (videoMap.has(vid)) {
        // console.log(`Duplicate video ID ${vid} for ${ex.name} and ${videoMap.get(vid)}`);
      } else {
        videoMap.set(vid, ex.name);
      }
    }
  }

  if (!ex.imageUrl) {
    missingImages.push({ i, id: ex.id, name: ex.name });
  }
});

console.log('Missing/invalid videos:', missingVideo.length);
console.log('Missing images:', missingImages.length);
