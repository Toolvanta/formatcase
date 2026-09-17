import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const svgContent = fs.readFileSync('packages/web/public/favicon.svg', 'utf8');

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'favicon-96x96.png', size: 96 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
];

const tempDir = path.resolve('temp_icons_build');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

for (const { name, size } of sizes) {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: ${size}px; height: ${size}px; overflow: hidden; background: transparent; }
    svg { width: ${size}px; height: ${size}px; display: block; }
  </style>
</head>
<body>
  ${svgContent}
</body>
</html>`;

  const htmlPath = path.join(tempDir, `render_${size}.html`);
  fs.writeFileSync(htmlPath, html);

  const outPath = path.resolve('packages/web/public', name);
  console.log(`Generating ${name} (${size}x${size})...`);
  execFileSync(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--default-background-color=00000000',
    `--window-size=${size},${size}`,
    `--screenshot=${outPath}`,
    `file:///${htmlPath.replace(/\\/g, '/')}`,
  ]);
  console.log(`✓ Created ${outPath} (${fs.statSync(outPath).size} bytes)`);
}

// Build multi-size favicon.ico from 16x16, 32x32, 48x48 PNGs
console.log('Building favicon.ico (16x16, 32x32, 48x48)...');
const icoSizes = [16, 32, 48];
const images = icoSizes.map((size) => {
  const filePath = path.resolve('packages/web/public', `favicon-${size}x${size}.png`);
  return {
    width: size,
    height: size,
    data: fs.readFileSync(filePath),
  };
});

// ICO header (6 bytes)
// 0-1: reserved = 0
// 2-3: type = 1
// 4-5: count = images.length
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);

let offset = 6 + images.length * 16;
const entries = [];
for (const img of images) {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(img.width === 256 ? 0 : img.width, 0);
  entry.writeUInt8(img.height === 256 ? 0 : img.height, 1);
  entry.writeUInt8(0, 2); // color count
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(img.data.length, 8); // size of image data
  entry.writeUInt32LE(offset, 12); // offset of image data
  entries.push(entry);
  offset += img.data.length;
}

const icoBuffer = Buffer.concat([header, ...entries, ...images.map((img) => img.data)]);
const icoPath = path.resolve('packages/web/public/favicon.ico');
fs.writeFileSync(icoPath, icoBuffer);
console.log(`✓ Created ${icoPath} (${icoBuffer.length} bytes)`);

// Cleanup temp folder
fs.rmSync(tempDir, { recursive: true, force: true });
console.log('All favicon assets built successfully!');
