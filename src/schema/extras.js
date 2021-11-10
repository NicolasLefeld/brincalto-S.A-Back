const mongoose = require("mongoose");

const extrasSchema = new mongoose.Schema(
  {
    chargesLastId: Number,
    paymentsLastId: Number,
  },
  { collection: "extras" }
);

module.exports.extrasSchema = mongoose.model("extrasModel", extrasSchema);
