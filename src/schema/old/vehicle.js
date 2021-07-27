const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    plate: String,
    comment: String,
  }, { collection: 'vehicles' },
);

module.exports.vehicleSchema = mongoose.model('vehicleModel', vehicleSchema);
