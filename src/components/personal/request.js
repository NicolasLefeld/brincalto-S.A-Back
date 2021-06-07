const { personalSchema } = require('../../schema/personal');

async function retrievePersonalRecords(filter = {}) {
  return personalSchema.find(filter);
}

async function insertPersonalRecord(name, lastname, phone, vehicles) {
  const created = await personalSchema.create({
    name, lastname, phone, vehicles,
  });

  return created;
}

async function updatePersonalRecord(id, newData) {
  return personalSchema.updateOne({ _id: id }, newData);
}

async function removePersonalRecord(id) {
  return personalSchema.findByIdAndDelete(id);
}

module.exports = {
  retrievePersonalRecords, insertPersonalRecord, updatePersonalRecord, removePersonalRecord,
};
