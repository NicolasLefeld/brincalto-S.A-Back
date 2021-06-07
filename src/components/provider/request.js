const { providerSchema } = require('../../schema/provider');

async function retrieveProviderRecords(filter = {}) {
  return providerSchema.find(filter);
}

async function insertProviderRecord(name, checkingAccount, comment) {
  const created = await providerSchema.create({
    name, checking_account: checkingAccount, comment,
  });

  return created;
}

async function updateProviderRecord(id, newData) {
  return providerSchema.updateOne({ _id: id }, newData);
}

async function removeProviderRecord(id) {
  return providerSchema.findByIdAndDelete(id);
}

module.exports = {
  retrieveProviderRecords, insertProviderRecord, updateProviderRecord, removeProviderRecord,
};
