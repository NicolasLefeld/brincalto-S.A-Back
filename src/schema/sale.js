const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    type: String,
    date: Date,
    invoice_id: String,
    amount: Number,
    net: Number,
    netPlusIva: Number,
    total: Number,
    status: String,
    client_id: String,
  },
  { collection: "sale" }
);

module.exports.saleSchema = mongoose.model("saleModel", saleSchema);
