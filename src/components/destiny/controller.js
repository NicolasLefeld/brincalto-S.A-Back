const {
  retrieveDestinyRecords, insertDestinyRecord, updateDestinyRecord, removeDestinyRecord,
} = require('./request');

async function retrieveDestiny() {
  const records = await retrieveDestinyRecords();

  if (records.length > 0) return { status: 200, body: records };
  return { status: 404 };
}

async function insertDestiny(type, from, to, comment) {
  const created = await insertDestinyRecord(type, from, to, comment);

  if (created) return { status: 201, body: created };
  return { status: 404 };
}

async function updateDestiny(id, newData) {
  const { nModified, ok } = await updateDestinyRecord(id, newData);

  if (ok) return { status: 200, body: { nModified, ok } };
  return { status: 404 };
}

async function removeDestiny(id) {
  const removed = await removeDestinyRecord(id);

  if (removed !== null) return { status: 200 };
  return { status: 404 };
}

module.exports = {
  retrieveDestiny, insertDestiny, updateDestiny, removeDestiny,
};
