const mongoose = require("mongoose");

const oilSchema = new mongoose.Schema(
  {
    type: String, // spare || oil
    liters: Number,
    availableLitters: Number,
    comment: String,
    movements: [
      {
        observation: String,
        littersTaken: Number,
        date: String,
      },
    ],
  },
  { collection: "stock" }
);

module.exports.oilSchema = mongoose.model("oilModel", oilSchema);
