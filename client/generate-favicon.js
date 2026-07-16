const fs = require('fs');
const img = fs.readFileSync('./public/vaaknowlogo.png');
const b64 = img.toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <image href="data:image/png;base64,${b64}" width="100" height="100" preserveAspectRatio="xMinYMid slice" />
</svg>`;
fs.writeFileSync('./public/vaaknow-favicon.svg', svg);
