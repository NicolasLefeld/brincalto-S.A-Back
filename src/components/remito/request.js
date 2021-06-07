const { remitochema } = require('../../schema/remito');

async function retrieveRemitoRecords(filter = {}) {
  return remitochema.find(filter);
}

async function insertRemitoRecord(number) {
  const created = await remitochema.create({ number });

  return created;
}

async function updateRemitoRecord(id, newData) {
  return remitochema.updateOne({ _id: id }, newData);
}

async function removeRemitoRecord(id) {
  return remitochema.findByIdAndDelete(id);
}

module.exports = {
  retrieveRemitoRecords, insertRemitoRecord, updateRemitoRecord, removeRemitoRecord,
};
