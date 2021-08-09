const mongoose = require("mongoose");

const spareSchema = new mongoose.Schema(
  {
    type: String,
    quantity: Number,
    product: String,
    comment: String,
    movements: [
      {
        comment: String,
        date: Date,
        quantityTaken: Number,
      },
    ],
  },
  { collection: "stock" }
);

module.exports.spareSchema = mongoose.model("spareModel", spareSchema);
