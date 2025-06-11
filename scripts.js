/*List of all file names in assets > portfolio_images are

0965f554-1e79-4b64-8e45-bc0fcfd8eee4.png
11APRIL001A.png
11APRIL002A.png
1a (1).png
5C.png
5eda5b8e-e7a6-4d27-9cab-ef788deac3bf (1).png
5eda5b8e-e7a6-4d27-9cab-ef788deac3bf.png
A.png
AI social media ad.png
AI_photoshoots2.mp4
B.png
Drools_AI_Brand_Film.mov
Final1 copy.png
Infographic1.png
Spriggo_UGC_Video_7.mp4
d3ff6825-e2a2-4ed8-a374-cb3f080522d7.png
enhance__46620 (1).png
enhance__70794.png
freepik__enhance__19438.png
freepik__enhance__47866.png
freepik__enhance__47870.png
freepik__enhance__53146.png
freepik__enhance__53151.png
freepik__enhance__54607.png
freepik__enhance__98662.png
jar-2B.png
media_img_eUA1uznWQ8.png
upscaled_Photoshoot 1.png
upscaled_Photoshoot 2.png
1.mp4
1.png
1a (1).png
Bianca-3-0304.mov
adjust__1136 9.49.50 PM.png
freepik__adjust__57792.png
freepik__enhance__54602 9.49.50 PM.png
freepik__enhance__81288.png
freepik__static-camera-a-woman-adorned-in-a-traditional-sar__57791.mov
*/

const portfolioImages = [
    // "1.mp4",
    "enhance__70794.png",
  
  // "freepik__enhance__54607.png",
  // "upscaled_Photoshoot 2.png",



  "5C.png",

  "5eda5b8e-e7a6-4d27-9cab-ef788deac3bf.png",

  "AI_photoshoots2.mp4",
  "B.png",
  "Drools_AI_Brand_Film.mov",
  "11APRIL002A.png",
  "Final1 copy.png",
  "Infographic1.png",
  "Spriggo_UGC_Video_7.mp4",
  "freepik__enhance__47870.png",
  "d3ff6825-e2a2-4ed8-a374-cb3f080522d7.png",
  "enhance__46620 (1).png",
  "freepik__enhance__19438.png",
  "A.png",
  "AI social media ad.png",
  "freepik__enhance__47866.png",
  "media_img_eUA1uznWQ8.png",
  "freepik__enhance__53146.png",
  "freepik__enhance__53151.png",
  "freepik__adjust__57792.png",
  "adjust__1136 9.49.50 PM.png",
  "0965f554-1e79-4b64-8e45-bc0fcfd8eee4.png",
  "freepik__enhance__98662.png",
  "1a (1).png",
  "jar-2B.png",
  
    "1.png",
    "upscaled_Photoshoot 1.png",
    "Bianca-3-0304.mov",
    
    
    "freepik__enhance__54602 9.49.50 PM.png",
    "freepik__enhance__81288.png",
    "freepik__static-camera-a-woman-adorned-in-a-traditional-sar__57791.mov",

  
];

// Function to insert images and videos into the grid
function insertPortfolioItems() {
  const grid = document.querySelector('.services-grid');
  portfolioImages.forEach(file => {
    const isVideo = file.endsWith('.mp4') || file.endsWith('.mov');
    const item = document.createElement('div');
    item.className = 'service-card';
    const content = isVideo ?
      `<video src="assets/portfolio_images/${file}" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 6px;"></video>` :
      `<img src="assets/portfolio_images/${file}" alt="" style="width: 100%; height: auto; object-fit: cover; display: block; border-radius: 6px;" />`;
    item.innerHTML = `<div class="service-card-background">${content}</div>`;
    grid.appendChild(item);
  });
}

// Call the function to insert items
insertPortfolioItems();