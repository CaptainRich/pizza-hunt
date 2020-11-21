const { Schema } = require("mongoose")

// Import the dependencies
const { Schema, model } = require( 'mongoose' );


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
      default: Date.now
    },
    size: {
      type: String,
      default: 'Large'
    },
    toppings: []
  });

  // Create the Pizza model using the PizzaSchema defined above
const Pizza = model( 'Pizza', PizzaSchema );

// Export the Pizza model
module.exports = Pizza;