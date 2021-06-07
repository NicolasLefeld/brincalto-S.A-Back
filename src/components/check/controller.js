const {
  retrieveCheckRecords, insertCheckRecord, updateCheckRecord, removeCheckRecord,
} = require('./request');

async function retrieveCheck() {
  const records = await retrieveCheckRecords();

  if (records.length > 0) return { status: 200, body: records };
  return { status: 404 };
}

async function insertCheck(number, bank, amount, expiration) {
  const created = await insertCheckRecord(number, bank, amount, expiration);

  if (created) return { status: 201, body: created };
  return { status: 404 };
}

async function updateCheck(id, newData) {
  const { nModified, ok } = await updateCheckRecord(id, newData);

  if (ok) return { status: 200, body: { nModified, ok } };
  return { status: 404 };
}

async function removeCheck(id) {
  const removed = await removeCheckRecord(id);

  if (removed !== null) return { status: 200 };
  return { status: 404 };
}

module.exports = {
  retrieveCheck, insertCheck, updateCheck, removeCheck,
};
