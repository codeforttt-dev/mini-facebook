const sharp = require('sharp');
const fs = require('fs');

async function cropIcon() {
  try {
    const inputBuffer = fs.readFileSync('./public/vaaknowlogo.png');
    
    // Trim transparent pixels automatically
    await sharp(inputBuffer)
      .trim() // This removes all transparent padding around the actual pixels!
      .resize(256, 256, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }) // Resize to a nice square icon
      .png()
      .toFile('./public/cropped-icon.png');
      
    console.log('Successfully cropped the icon!');
  } catch (err) {
    console.error('Error cropping image:', err);
  }
}

cropIcon();
