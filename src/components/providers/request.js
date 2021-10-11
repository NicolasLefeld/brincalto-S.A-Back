const { providerSchema } = require("../../schema/provider");

async function retrieveProviderDb(filter = {}) {
  return providerSchema.find(filter);
}

async function insertProviderDb(body) {
  const created = await providerSchema.create({
    name: body.name,
    purchases: body.purchases,
    checkingAccount: body.checkingAccount,
    comment: body.comment,
    cuit: body.cuit,
    address: body.address,
  });

  return created;
}

async function updateProviderDb(id, newData) {
  return providerSchema.updateOne({ _id: id }, newData);
}

async function removeProviderDb(id) {
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

async function retrieveProviderDbById(id, projection = "") {
  return providerSchema.findById(id, projection);
}

module.exports = {
  retrieveProviderDb,
  insertProviderDb,
  updateProviderDb,
  removeProviderDb,
  updateProviderpurchases,
  retrieveProviderDbById,
};
