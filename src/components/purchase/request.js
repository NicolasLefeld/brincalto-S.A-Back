const { purchaseSchema } = require('../../schema/purchase');

async function retrievePurchaseRecords(filter = {}) {
  return purchaseSchema.find(filter);
}

async function insertPurchaseRecord(date, type, concept, net, iva, total, others, comment) {
  const created = await purchaseSchema.create({
    date, type, concept, net, iva, total, others, comment,
  });

  return created;
}

async function updatePurchaseRecord(id, newData) {
  return purchaseSchema.updateOne({ _id: id }, newData);
}

async function removePurchaseRecord(id) {
  return purchaseSchema.findByIdAndDelete(id);
}

module.exports = {
  retrievePurchaseRecords, insertPurchaseRecord, updatePurchaseRecord, removePurchaseRecord,
};
