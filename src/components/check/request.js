const { checkSchema } = require('../../schema/check');

async function retrieveCheckRecords(filter = {}) {
  return checkSchema.find(filter);
}

async function insertCheckRecord(number, bank, amount, expiration) {
  const created = await checkSchema.create({
    number, bank, amount, expiration,
  });

  return created;
}

async function updateCheckRecord(id, newData) {
  return checkSchema.updateOne({ _id: id }, newData);
}

async function removeCheckRecord(id) {
  return checkSchema.findByIdAndDelete(id);
}

module.exports = {
  retrieveCheckRecords, insertCheckRecord, updateCheckRecord, removeCheckRecord,
};
