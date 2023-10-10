const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  // Existing fields
  title: String,
  summary: String,
  content: String,
  cover: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // Add a field for categories
  categories: [String],
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
