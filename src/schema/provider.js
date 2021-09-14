const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    name: String,
    comment: String,
    cuit: String,
    address: String,
    purchases: [
      {
        concept: String,
        date: Date,
        amount: String,
        invoice_id: String,
      },
    ],
  },
  { collection: "providers" }
);

module.exports.providerSchema = mongoose.model("providerModel", providerSchema);
