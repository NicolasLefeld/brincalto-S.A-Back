const { saleSchema } = require('../../schema/sales');

async function retrieveSaleRecords(filter = {}) {
  return saleSchema.find(filter);
}

async function insertSaleRecord(
  date, remitoId, type, cubicMeters, total, clientId, state, driverId,
) {
  const created = await saleSchema.create({
    date,
    remito_id: remitoId,
    type,
    cubic_meters: cubicMeters,
    total,
    client_id: clientId,
    state,
    driver_id: driverId,
  });

  return created;
}

async function updateSaleRecord(id, newData) {
  return saleSchema.updateOne({ _id: id }, newData);
}

async function removeSaleRecord(id) {
  return saleSchema.findByIdAndDelete(id);
}

module.exports = {
  retrieveSaleRecords, insertSaleRecord, updateSaleRecord, removeSaleRecord,
};
