const {
  retrievePersonalRecords, insertPersonalRecord, updatePersonalRecord, removePersonalRecord,

} = require('./request');

async function retrievePersonal() {
  const records = await retrievePersonalRecords();

  if (records.length > 0) return { status: 200, body: records };
  return { status: 404 };
}

async function insertPersonal(name, lastname, phone, vehicles) {
  const created = await insertPersonalRecord(name, lastname, phone, vehicles);

  if (created) return { status: 201, body: created };
  return { status: 404 };
}

async function updatePersonal(id, newData) {
  const { nModified, ok } = await updatePersonalRecord(id, newData);

  if (ok) return { status: 200, body: { nModified, ok } };
  return { status: 404 };
}

async function removePersonal(id) {
  const removed = await removePersonalRecord(id);

  if (removed !== null) return { status: 200 };
  return { status: 404 };
}

module.exports = {
  retrievePersonal, insertPersonal, updatePersonal, removePersonal,
};
