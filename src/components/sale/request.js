const { saleSchema } = require("../../schema/sale");

async function retrieveSalesRecords(filter = {}) {
  return saleSchema.find(filter);
}

async function insertSalesRecord(
  date,
  sale_id,
  amount,
  net,
  netPlusIva,
  total,
  type,
  status,
  client_id
) {
  const created = await saleSchema.create({
    date,
    sale_id,
    amount,
    net,
    netPlusIva,
    total,
    type,
    status,
    client_id
  });

  return created;
}

async function updateSalesRecord(id, newData) {
  return saleSchema.updateOne({ _id: id }, newData);
}

async function removeSalesRecord(id) {
  return saleSchema.findByIdAndDelete(id);
}

module.exports = {
  retrieveSalesRecords,
  insertSalesRecord,
  updateSalesRecord,
  removeSalesRecord,
};
