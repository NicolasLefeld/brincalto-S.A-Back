const mongoose = require('mongoose');

const logSchema = new mongoose.Schema(
  {
    date: Date,
    description: String,
  }, { collection: 'logs' },
);

module.exports.logSchema = mongoose.model('logModel', logSchema);
