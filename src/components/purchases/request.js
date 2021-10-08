const { purchaseSchema } = require("../../schema/purchase");

async function retrievePurchasesDb(filter = {}) {
  return purchaseSchema.find(filter);
}

async function insertPurchasesDb(body) {
  return await purchaseSchema.create({
    provider_id: body.provider_id,
    date: body.date,
    invoice_id: body.invoice_id,
    concept: body.concept,
    net: body.net,
    netPlusIva: body.netPlusIva,
    total: body.total,
    extras: body.extras,
    status: body.status,
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
