const mongoose = require('mongoose');

const remitochema = new mongoose.Schema(
  {
    number: String,
  }, { collection: 'remitos' },
);

module.exports.remitochema = mongoose.model('remitoModel', remitochema);
