const mongoose = require('mongoose');

const checkSchema = new mongoose.Schema(
  {
    number: String,
    bank: String,
    amount: Number,
    expiration: Date,
  }, { collection: 'checks' },
);

module.exports.checkSchema = mongoose.model('checkModel', checkSchema);
