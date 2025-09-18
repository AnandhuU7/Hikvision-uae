import { config } from 'dotenv';
import { resolve } from 'path';
import readline from 'readline';
import connectDB from '../src/app/config/db';
import Admin from '../src/app/models/Admin';

// Load .env.local file
config({ path: resolve(process.cwd(), '.env.local') });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

async function createAdmin() {
  try {
    // Connect to database
    await connectDB();

    // Get admin details from terminal
    const email = await question('Enter admin email: ');
    const username = await question('Enter admin username: ');
    const password = await question('Enter admin password: ');

    // Create new admin
    const admin = new Admin({
      email,
      username,
      password,
    });

    // Save admin to database
    await admin.save();

    console.log('Admin created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

createAdmin(); 