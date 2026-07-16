const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Replace all dicebear urls (avataaars, identicon, etc) with '/default-avatar.svg'
  const regex = /https:\/\/api\.dicebear\.com\/[^\/]+\/[^\/]+\/svg\?seed=[a-zA-Z0-9_${}\-]+/g;
  let newContent = content.replace(regex, '/default-avatar.svg');
  // Also handle exact string matches where the URL is hardcoded without template literal
  const regex2 = /'https:\/\/api\.dicebear\.com\/[^']+'/g;
  newContent = newContent.replace(regex2, "'/default-avatar.svg'");
  
  const regex3 = /"https:\/\/api\.dicebear\.com\/[^"]+"/g;
  newContent = newContent.replace(regex3, '"/default-avatar.svg"');

  const regex4 = /`https:\/\/api\.dicebear\.com\/[^`]+`/g;
  newContent = newContent.replace(regex4, "'/default-avatar.svg'");
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Updated:', filePath);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

walk('./src');
console.log('Done replacing default avatars.');
