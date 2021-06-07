const {
  retrievePurchaseRecords, insertPurchaseRecord, updatePurchaseRecord, removePurchaseRecord,

} = require('./request');

async function retrievePurchase() {
  const records = await retrievePurchaseRecords();

  if (records.length > 0) return { status: 200, body: records };
  return { status: 404 };
}

async function insertPurchase(date, type, concept, net, iva, total, others, comment) {
  const created = await insertPurchaseRecord(date, type, concept, net, iva, total, others, comment);

  if (created) return { status: 201, body: created };
  return { status: 404 };
}

async function updatePurchase(id, newData) {
  const { nModified, ok } = await updatePurchaseRecord(id, newData);

  if (ok) return { status: 200, body: { nModified, ok } };
  return { status: 404 };
}

async function removePurchase(id) {
  const removed = await removePurchaseRecord(id);

  if (removed !== null) return { status: 200 };
  return { status: 404 };
}

module.exports = {
  retrievePurchase, insertPurchase, updatePurchase, removePurchase,
};
