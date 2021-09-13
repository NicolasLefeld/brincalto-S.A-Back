const mongoose = require("mongoose");

const oilSchema = new mongoose.Schema(
  {
    type: String,
    liters: Number,
    availableLitters: Number,
    costPerLitter: Number,
    comment: String,
    movements: [
      {
        comment: String,
        littersTaken: Number,
        date: Date,
      },
    ],
  },
  { collection: "stock" }
);

module.exports.oilSchema = mongoose.model("oilModel", oilSchema);
