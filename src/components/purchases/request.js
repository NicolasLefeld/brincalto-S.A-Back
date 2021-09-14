const { purchaseSchema } = require("../../schema/purchase");

async function retrievePurchasesRecords(filter = {}) {
  return purchaseSchema.find(filter);
}

async function insertPurchasesRecord(
  provider_id,
  date,
  invoice_id,
  concept,
  net,
  netPlusIva,
  total,
  extras
) {
  return await purchaseSchema.create({
    provider_id,
    date,
    invoice_id,
    concept,
    net,
    netPlusIva,
    total,
    extras,
  });
}

async function updatePurchasesRecord(id, newData) {
  return purchaseSchema.updateOne({ _id: id }, newData);
}

async function removePurchasesRecord(id) {
  return purchaseSchema.findByIdAndDelete(id);
}

module.exports = {
  retrievePurchasesRecords,
  insertPurchasesRecord,
  updatePurchasesRecord,
  removePurchasesRecord,
};
