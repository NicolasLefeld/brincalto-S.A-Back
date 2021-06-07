const {
  retrieveSaleRecords, insertSaleRecord, updateSaleRecord, removeSaleRecord,
} = require('./request');

async function retrieveSale() {
  const records = await retrieveSaleRecords();

  if (records.length > 0) return { status: 200, body: records };
  return { status: 404 };
}

async function insertSale(date, remitoId, type, cubicMeters, total, clientId, state, driverId) {
  const created = await insertSaleRecord(
    date, remitoId, type, cubicMeters, total, clientId, state, driverId,
  );

  if (created) return { status: 201, body: created };
  return { status: 404 };
}

async function updateSale(id, newData) {
  const { nModified, ok } = await updateSaleRecord(id, newData);

  if (ok) return { status: 200, body: { nModified, ok } };
  return { status: 404 };
}

async function removeSale(id) {
  const removed = await removeSaleRecord(id);

  if (removed !== null) return { status: 200 };
  return { status: 404 };
}

module.exports = {
  retrieveSale, insertSale, updateSale, removeSale,
};
