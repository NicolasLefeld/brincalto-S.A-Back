const mongoose = require('mongoose');

const personalSchema = new mongoose.Schema(
  {
    name: String,
    lastname: String,
    phone: String,
    vehicles: [{
      vehicle_id: String,
    }],
  }, { collection: 'personal' },
);

module.exports.personalSchema = mongoose.model('personalModel', personalSchema);
