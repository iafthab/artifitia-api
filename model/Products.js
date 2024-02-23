const mongoose = require("mongoose");

const productsSchema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  sub_category: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Products", productsSchema);
