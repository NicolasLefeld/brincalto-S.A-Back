const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    date: String,
    provider_id: String,
    check_id: String,
  }, { collection: 'payments' },
);

module.exports.paymentSchema = mongoose.model('paymentModel', paymentSchema);
