const { purchaseSchema } = require("../../schema/purchase");

async function retrievePurchasesDb(filter = {}) {
  return purchaseSchema.find(filter);
}

async function insertPurchasesDb(
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

async function updatePurchasesDb(id, newData) {
  return purchaseSchema.updateOne({ _id: id }, newData);
}

async function removePurchasesDb(id) {
  return purchaseSchema.findByIdAndDelete(id);
}

module.exports = {
  retrievePurchasesDb,
  insertPurchasesDb,
  updatePurchasesDb,
  removePurchasesDb,
};
