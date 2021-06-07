const mongoose = require('mongoose');

const destinySchema = new mongoose.Schema(
  {
    type: String,
    from: String,
    to: String,
    comment: String,
  }, { collection: 'destinies' },
);

module.exports.destinySchema = mongoose.model('destinyModel', destinySchema);
