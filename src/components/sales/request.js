const { saleSchema } = require("../../schema/sale");

async function retrieveSalesDb(filter = {}) {
  return saleSchema.find(filter);
}

async function insertSalesDb(
  date,
  invoice_id,
  amount,
  net,
  netPlusIva,
  total,
  type,
  status,
  client_id,
  concept
) {
  const created = await saleSchema.create({
    date,
    invoice_id,
    amount,
    net,
    netPlusIva,
    total,
    type,
    status,
    client_id,
    concept,
  });

  return created;
}

async function updateSalesDb(id, newData) {
  return saleSchema.updateOne({ _id: id }, newData);
}

async function removeSalesDb(id) {
  return saleSchema.findByIdAndDelete(id);
}

module.exports = {
  retrieveSalesDb,
  insertSalesDb,
  updateSalesDb,
  removeSalesDb,
};
