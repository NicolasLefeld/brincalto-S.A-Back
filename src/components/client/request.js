const { clientSchema } = require('../../schema/client');

async function retrieveClientRecords(filter = {}) {
  return clientSchema.find(filter);
}

async function insertClientRecord(name, checkingAccount, comment, destinies) {
  const created = await clientSchema.create({
    name, checking_account: checkingAccount, comment, destinies
  });

  return created;
}

async function updateClientRecord(id, newData) {
  return clientSchema.updateOne({ _id: id }, newData);
}

async function removeClientRecord(id) {
  return clientSchema.findByIdAndDelete(id);
}

module.exports = {
  retrieveClientRecords, insertClientRecord, updateClientRecord, removeClientRecord,
};
