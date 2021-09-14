const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    name: String,
    cuit: String,
    address: String,
    contacto: String,
    checkingAccount: String,
    assigned_products: [],
  },
  { collection: "clients" }
);

module.exports.clientSchema = mongoose.model("clientModel", clientSchema);
