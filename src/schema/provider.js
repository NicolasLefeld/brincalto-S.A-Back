const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    name: String,
    checking_account: Number,
    comment: String,
    cuit: String,
    address: String,
  },
  { collection: "providers" }
);

module.exports.providerSchema = mongoose.model("providerModel", providerSchema);
