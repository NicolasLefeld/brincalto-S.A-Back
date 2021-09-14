const { providerSchema } = require("../../schema/provider");

async function retrieveProviderRecords(filter = {}) {
  return providerSchema.find(filter);
}

async function insertProviderRecord(
  name,
  purchases,
  comment,
  cuit,
  address
) {
  const created = await providerSchema.create({
    name,
    purchases,
    comment,
    cuit,
    address,
  });

  return created;
}

async function updateProviderRecord(id, newData) {
  return providerSchema.updateOne({ _id: id }, newData);
}

async function removeProviderRecord(id) {
  return providerSchema.findByIdAndDelete(id);
}

async function updateProviderpurchases(id, invoiceData) {
  return providerSchema.updateOne(
    { _id: id },
    {
      $push: {
        purchases: {
          concept: invoiceData.comment,
          date: invoiceData.date,
          amount: invoiceData.amount,
          invoice_id: invoiceData.invoice_id,
        },
      },
    }
  );
}

module.exports = {
  retrieveProviderRecords,
  insertProviderRecord,
  updateProviderRecord,
  removeProviderRecord,
  updateProviderpurchases,
};
