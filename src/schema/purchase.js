const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema(
  {
    date: String,
    type: String,
    concept: String,
    net: Number,
    iva: Number,
    total: Number,
    others: String,
    comment: String,
  }, { collection: 'purchases' },
);

module.exports.purchaseSchema = mongoose.model('purchaseModel', purchaseSchema);
