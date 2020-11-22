
// Import the dependencies
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


// Define the 'reply' schema. Replies will be sub-documents to 'comments'.
const ReplySchema = new Schema(
  {
    // Set custom id to avoid confusion with parent comment _id
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    replyBody: {
      type: String
    },
    writtenBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  } 
);

// Define the 'comment' schema
const CommentSchema = new Schema(
  {
    writtenBy: {
      type: String
    },
    commentBody: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    replies: [ReplySchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  } 
);

// Add the 'virtual property' to maintain the count of replies for a comment.
// Get the total count of replies on retrieval
CommentSchema.virtual('replyCount').get(function() {
   return this.replies.length;
}); 


 // Create the Comment model using the CommentSchema defined above
const Comment = model('Comment', CommentSchema);

// Export the Comment model
module.exports = Comment;