const {
  retrievePaymentRecords, insertPaymentRecord, updatePaymentRecord, removePaymentRecord,
} = require('./request');

async function retrievePayment() {
  const records = await retrievePaymentRecords();

  if (records.length > 0) return { status: 200, body: records };
  return { status: 404 };
}

async function insertPayment(date, providerId, checkId) {
  const created = await insertPaymentRecord(date, providerId, checkId);

  if (created) return { status: 201, body: created };
  return { status: 404 };
}

async function updatePayment(id, newData) {
  const { nModified, ok } = await updatePaymentRecord(id, newData);

  if (ok) return { status: 200, body: { nModified, ok } };
  return { status: 404 };
}

async function removePayment(id) {
  const removed = await removePaymentRecord(id);

  if (removed !== null) return { status: 200 };
  return { status: 404 };
}

module.exports = {
  retrievePayment, insertPayment, updatePayment, removePayment,
};
