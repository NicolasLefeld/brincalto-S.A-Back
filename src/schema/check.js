const mongoose = require("mongoose");

const checkSchema = new mongoose.Schema(
  {
    check_number: String,
    bank: String,
    amount: Number,
    expiration_date: Date,
    from: String,
    to: String,
    status: {
      type: String,
      enum: ["received", "delivered"],
      default: "received",
    },
    date: String,
  },
  { collection: "checks" }
);

module.exports.checkSchema = mongoose.model("checkModel", checkSchema);
