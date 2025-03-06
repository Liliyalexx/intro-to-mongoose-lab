// In models/customer.js, we’ll want to accomplish the following:

// We define a schema.
// Compile the schema into a model.
// Export the model.

// We define a schema.
const mongoose = require("mongoose");

//define the following schema
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

// Export the model
module.exports = mongoose.model("Customer", customerSchema);
