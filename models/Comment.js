
// Import the dependencies
const { Schema, model } = require('mongoose');


// Define the schema
const CommentSchema = new Schema({
  writtenBy: {
    type: String
  },
  commentBody: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

 // Create the Comment model using the CommentSchema defined above
const Comment = model('Comment', CommentSchema);

// Export the Comment model
module.exports = Comment;