import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const pngPath = path.resolve('public/assets/icone.png');
const jpgPath = path.resolve('public/assets/icone.jpg');

async function convertIcon() {
    if (fs.existsSync(pngPath)) {
        try {
            await sharp(pngPath)
                .jpeg({ quality: 85 })
                .toFile(jpgPath);
            console.log('Successfully converted icone.png to icone.jpg');

            // Delete old PNG to save space
            fs.unlinkSync(pngPath);
            console.log('Deleted icone.png');
        } catch (err) {
            console.error('Error converting icon:', err);
        }
    } else {
        console.log('icone.png not found at', pngPath);
    }
}

convertIcon();
