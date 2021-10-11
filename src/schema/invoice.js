const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["A", "B"] },
    status: { type: String, enum: ["pending", "paid"], required: true },
    date: Date,
    invoice_id: String,
    net: Number,
    netPlusIva: Number,
    total: Number,
    client_id: String,
    concept: String,
  },
  { collection: "sales" }
);

module.exports.invoiceSchema = mongoose.model("invoiceModel", invoiceSchema);
