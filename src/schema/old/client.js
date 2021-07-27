const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
  {
    name: String,
    checking_account: Number,
    comment: String,
    destinies: [],
  }, { collection: 'clients' },
);

module.exports.clientSchema = mongoose.model('clientModel', clientSchema);
