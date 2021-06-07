const { destinySchema } = require('../../schema/destiny');

async function retrieveDestinyRecords(filter = {}) {
  return destinySchema.find(filter);
}

async function insertDestinyRecord(type, from, to, comment) {
  const created = await destinySchema.create({
    type, from, to, comment,
  });

  return created;
}

async function updateDestinyRecord(id, newData) {
  return destinySchema.updateOne({ _id: id }, newData);
}

async function removeDestinyRecord(id) {
  return destinySchema.findByIdAndDelete(id);
}

module.exports = {
  retrieveDestinyRecords, insertDestinyRecord, updateDestinyRecord, removeDestinyRecord,
};
