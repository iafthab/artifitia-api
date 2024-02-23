const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: [
    {
      type: String,
    },
  ],
});
module.exports = mongoose.model("Category", categorySchema);
