const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: String, // Base64 or URL
    required: true
  },
  viewers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    // Default to 24 hours from creation
    default: () => new Date(+new Date() + 24 * 60 * 60 * 1000)
  }
});

// TTL index to automatically delete expired stories
storySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Index for fast feed fetching
storySchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Story', storySchema);
