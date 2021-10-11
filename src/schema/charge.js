const mongoose = require("mongoose");

const chargeSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["check", "cash", "others"] },
    check_id: String,
    amount: Number,
    client_id: String,
    comment_others: String,
    payment_comment: String,
    date: String,
  },
  { collection: "charges" }
);

module.exports.chargeSchema = mongoose.model("chargeModel", chargeSchema);
