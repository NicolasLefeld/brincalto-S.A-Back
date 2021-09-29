const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["A", "B"] },
    date: { type: Date, required: true },
    invoice_id: { type: String, required: true },
    net: { type: Number, required: false },
    netPlusIva: { type: Number, required: false },
    total: { type: Number, required: false },
    status: { type: String, enum: ["pending", "paid"], required: true },
    client_id: { type: String, required: true },
    concept: { type: String, required: true },
  },
  { collection: "sales" }
);

module.exports.invoiceSchema = mongoose.model("invoiceModel", invoiceSchema);
