const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  variants: [
    {
      ram: {
        type: String,
        // required: true,
      },
      price: {
        type: String,
        // required: true,
      },
      qty: {
        type: Number,
        // required: true,
      },
    },
  ],
  subCategory: {
    type: String,
    required: true,
  },
  images: {
    type: String,
  },
});

module.exports = mongoose.model("Products", productsSchema);
