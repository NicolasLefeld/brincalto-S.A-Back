const mongoose = require("mongoose");

const spareSchema = new mongoose.Schema(
  {
    type: String, // spare || oil
    quantity: Number,
    product: String,
  },
  { collection: "stock" }
);

module.exports.spareSchema = mongoose.model("spareModel", spareSchema);
