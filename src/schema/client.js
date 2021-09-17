const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    name: String,
    cuit: String,
    address: String,
    contacto: String,
    assigned_products: [],
    sales: [
      {
        concept: String,
        date: Date,
        amount: Number,
        invoice_id: String,
      },
    ],
  },
  { collection: "clients" }
);

module.exports.clientSchema = mongoose.model("clientModel", clientSchema);
