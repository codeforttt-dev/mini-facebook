require('dotenv').config();
const mongoose = require('mongoose');

async function updateAvatars() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mini-facebook');
    const User = require('./src/models/User');
    
    // Find all users with dicebear avatar
    const result = await User.updateMany(
      { avatar: { $regex: 'dicebear.com' } },
      { $set: { avatar: '/default-avatar.svg' } }
    );
    
    console.log(`Updated ${result.modifiedCount} users.`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

updateAvatars();
