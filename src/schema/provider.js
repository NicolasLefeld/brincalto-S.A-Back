const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    name: String,
    comment: String,
    cuit: String,
    address: String,
    checkingAccount: Number,
    purchases: [
      {
        concept: String,
        date: Date,
        amount: Number,
        invoice_id: String,
      },
    ],
  },
  { collection: "providers" }
);

module.exports.providerSchema = mongoose.model("providerModel", providerSchema);
