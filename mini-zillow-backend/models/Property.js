const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    location: String,
    price: Number,
    images: [String],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
