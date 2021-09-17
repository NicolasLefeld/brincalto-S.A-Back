const { clientSchema } = require("../../schema/client");

async function retrieveClientRecords(filter = {}) {
  return clientSchema.find(filter);
}

async function insertClientRecord(name, cuit, address, contacto, assigned_products, sales) {
  return await clientSchema.create({
    name, cuit, address, contacto, assigned_products, sales
  });
}

async function updateClientRecord(id, newData) {
  return clientSchema.updateOne({ _id: id }, newData);
}

async function removeClientRecord(id) {
  return clientSchema.findByIdAndDelete(id);
}


async function updateClientSales(id, invoiceData) {
  return clientSchema.updateOne(
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
  retrieveClientRecords,
  insertClientRecord,
  updateClientRecord,
  removeClientRecord,
  updateClientSales
};
