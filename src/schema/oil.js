const mongoose = require("mongoose");

const oilSchema = new mongoose.Schema(
  {
    type: String, // spare || oil
    oilId: String, //
    liters: Number,
    availableLitters: Number,
    movements: [
      {
        observation: String,
        littersTaken: Number,
        date: Number,
      },
    ],
  },
  { collection: "stock" }
);

module.exports.oilSchema = mongoose.model("oilModel", oilSchema);
