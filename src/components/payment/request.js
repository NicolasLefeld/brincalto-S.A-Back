const { paymentSchema } = require('../../schema/payment');

async function retrievePaymentRecords(filter = {}) {
  return paymentSchema.find(filter);
}

async function insertPaymentRecord(date, providerId, checkId) {
  const created = await paymentSchema.create({
    date, provider_id: providerId, check_id: checkId,
  });

  return created;
}

async function updatePaymentRecord(id, newData) {
  return paymentSchema.updateOne({ _id: id }, newData);
}

async function removePaymentRecord(id) {
  return paymentSchema.findByIdAndDelete(id);
}

module.exports = {
  retrievePaymentRecords, insertPaymentRecord, updatePaymentRecord, removePaymentRecord,
};
