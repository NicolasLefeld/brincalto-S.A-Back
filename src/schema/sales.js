const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema(
  {
    date: String,
    remito_id: String,
    type: String,
    cubic_meters: Number,
    total: Number,
    client_id: String,
    state: {
      type: String,
      default: 'not_paid',
    },
    driver_id: String,
  }, { collection: 'sales' },
);

module.exports.saleSchema = mongoose.model('saleModel', saleSchema);
