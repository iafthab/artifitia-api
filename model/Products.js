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
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  sub_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  },
  images: {
    type: String,
  },
});

module.exports = mongoose.model("Products", productsSchema);
