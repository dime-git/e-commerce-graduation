import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try loading from different locations
console.log('Loading environment variables...');
dotenv.config({ path: path.join(__dirname, 'config.env') });
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Print actual values (be careful with secrets in logs)
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
console.log(
  'CLOUDINARY_API_SECRET:',
  process.env.CLOUDINARY_API_SECRET ? 'Has value' : 'No value'
);

// Check if values are strings or some other type
console.log('Types:');
console.log(
  'CLOUDINARY_CLOUD_NAME type:',
  typeof process.env.CLOUDINARY_CLOUD_NAME
);
console.log('CLOUDINARY_API_KEY type:', typeof process.env.CLOUDINARY_API_KEY);
console.log(
  'CLOUDINARY_API_SECRET type:',
  typeof process.env.CLOUDINARY_API_SECRET
);
