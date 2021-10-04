const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    provider_id: String,
    date: Date,
    invoice_id: String,
    concept: String,
    net: Number,
    netPlusIva: Number,
    total: Number,
    extras: [
      {
        concepto: String,
        amount: Number,
      },
    ],
  },
  { collection: "purchases" }
);

module.exports.purchaseSchema = mongoose.model("purchaseModel", purchaseSchema);
