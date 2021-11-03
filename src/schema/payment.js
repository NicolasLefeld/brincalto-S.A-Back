const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["check", "cash", "others", "checkThirdParty", "checkOwn"] },
    check_id: String,
    amount: Number,
    provider_id: String,
    comment_others: String,
    payment_comment: String,
    date: String,
  },
  { collection: "payments" }
);

module.exports.paymentSchema = mongoose.model("paymentModel", paymentSchema);
