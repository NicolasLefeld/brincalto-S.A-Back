const {
  retrieveRemitoRecords, insertRemitoRecord, updateRemitoRecord, removeRemitoRecord,
} = require('./request');

async function retrieveRemito() {
  const records = await retrieveRemitoRecords();

  if (records.length > 0) return { status: 200, body: records };
  return { status: 404 };
}

async function insertRemito(number) {
  const created = await insertRemitoRecord(number);

  if (created) return { status: 201, body: created };
  return { status: 404 };
}

async function updateRemito(id, newData) {
  const { nModified, ok } = await updateRemitoRecord(id, newData);

  if (ok) return { status: 200, body: { nModified, ok } };
  return { status: 404 };
}

async function removeRemito(id) {
  const removed = await removeRemitoRecord(id);

  if (removed !== null) return { status: 200 };
  return { status: 404 };
}

module.exports = {
  retrieveRemito, insertRemito, updateRemito, removeRemito,
};
