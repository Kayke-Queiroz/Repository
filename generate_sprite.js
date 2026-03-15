import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from 'canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FRAMES_DIR = path.join(process.cwd(), 'src', 'assets', 'videos', 'frames');
const OUTPUT_FILE = path.join(process.cwd(), 'src', 'assets', 'videos', 'frames_sprite.jpg');
const COMPRESSION_QUALITY = 0.6; // 60% quality

async function createSpritesheet() {
    console.log('Reading frames directory...');
    const files = fs.readdirSync(FRAMES_DIR)
        .filter(file => file.endsWith('.jpg') && file !== 'frames_sprite.jpg')
        .sort((a, b) => {
            const numA = parseInt(a.match(/\\d+/)?.[0] || 0, 10);
            const numB = parseInt(b.match(/\\d+/)?.[0] || 0, 10);
            return numA - numB;
        });

    if (files.length === 0) {
        console.error('No JPG frames found.');
        return;
    }

    console.log(`Found ${files.length} frames. Loading first frame to determine dimensions...`);

    // Load first image to get dimensions
    const firstImage = await loadImage(path.join(FRAMES_DIR, files[0]));
    const frameWidth = firstImage.width;
    const frameHeight = firstImage.height;

    // Scale down by 50% for the sprite
    const SCALE = 0.5;
    const scaledWidth = Math.floor(frameWidth * SCALE);
    const scaledHeight = Math.floor(frameHeight * SCALE);

    // Grid: 14 cols x 12 rows (to fit 168 frames nicely and avoid super wide images)
    const cols = 14;
    const rows = Math.ceil(files.length / cols);

    const spriteWidth = cols * scaledWidth;
    const spriteHeight = rows * scaledHeight;

    console.log(`Grid: ${cols} cols x ${rows} rows`);
    console.log(`Original Frame size: ${frameWidth}x${frameHeight}`);
    console.log(`Scaled Frame size: ${scaledWidth}x${scaledHeight}`);
    console.log(`Spritesheet size: ${spriteWidth}x${spriteHeight}`);

    const canvas = createCanvas(spriteWidth, spriteHeight);
    const ctx = canvas.getContext('2d');

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imagePath = path.join(FRAMES_DIR, file);

        process.stdout.write(`\\rProcessing frame ${i + 1}/${files.length} (${file})`);

        try {
            const img = await loadImage(imagePath);

            const col = i % cols;
            const row = Math.floor(i / cols);

            const x = col * scaledWidth;
            const y = row * scaledHeight;

            ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
        } catch (err) {
            console.error(`\\nFailed to load image at: ${imagePath}`, err);
            process.exit(1);
        }
    }

    console.log('\\nEncoding to JPEG...');

    const buffer = canvas.toBuffer('image/jpeg', { quality: COMPRESSION_QUALITY });
    fs.writeFileSync(OUTPUT_FILE, buffer);

    console.log(`\\nDone! Spritesheet saved to ${OUTPUT_FILE}`);
    console.log(`File size: ${(buffer.length / 1024 / 1024).toFixed(2)} MB`);
}

createSpritesheet().catch(console.error);
