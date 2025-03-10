import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { exec } from 'child_process';
import { URL } from 'url';

dotenv.config({ path: './config.env' });

console.log('Attempting to connect to MongoDB...');
console.log('Connection string:', process.env.MONGODB_URI);

// Parse connection string to get hostname
let hostname = '';
try {
  if (process.env.MONGODB_URI.includes('@')) {
    hostname = process.env.MONGODB_URI.split('@')[1]
      .split('/')[0]
      .split('?')[0];
    if (hostname.includes(',')) {
      hostname = hostname.split(',')[0];
    }
    console.log('Hostname extracted:', hostname);
  }
} catch (error) {
  console.log('Could not parse hostname from connection string');
}

// Test connection with minimal options for local MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB Successfully');

    // List all collections
    return mongoose.connection.db.listCollections().toArray();
  })
  .then((collections) => {
    console.log('Available collections:');
    if (collections.length === 0) {
      console.log('No collections found (empty database)');
    } else {
      collections.forEach((collection) => {
        console.log(`- ${collection.name}`);
      });
    }

    console.log('\nConnection test completed successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);

    if (err.name === 'MongoServerSelectionError') {
      console.error('\nPossible causes:');
      console.error('1. MongoDB service might not be running properly');
      console.error(
        '2. Check if MongoDB is listening on the default port 27017'
      );
      console.error('3. Firewall might be blocking the connection');
    }

    process.exit(1);
  });
