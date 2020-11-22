

// Import the dependencies
const { Schema, model } = require( 'mongoose' );
const dateFormat = require('../utils/dateFormat');


// Define the schema
const PizzaSchema = new Schema({

    pizzaName: {
      type: String
    },

    createdBy: {
      type: String
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)      // reformat data information (from \utils\dateFormat.js)
    },

    size: {
      type: String,
      default: 'Large'
    },

    toppings: [],

  comments: [
    {
      type: Schema.Types.ObjectId,  // expect an object ID
      ref: 'Comment'                // that comes from the 'Comment' model
    }
  ]
  },
  {
    toJSON: {                       // setup the schema to allow 'virtuals'
      virtuals: true,
      getters:  true
    },
    id: false                       // don't need this for virtuals
  }
  );

  // Add the 'virtual property' to maintain the count of comments for a pizza
  // Get the total count of comments and replies on retrieval
  PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
  }); 

  // Create the Pizza model using the PizzaSchema defined above
const Pizza = model( 'Pizza', PizzaSchema );

// Export the Pizza model
module.exports = Pizza;