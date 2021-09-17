const { clientSchema } = require("../../schema/client");

async function retrieveClientDb(filter = {}) {
  return clientSchema.find(filter);
}

async function insertClientDb(body) {
  return await clientSchema.create({
    name: body.name,
    cuit: body.cuit,
    address: body.address,
    contacto: body.contacto,
    assigned_products: body.assigned_products,
    sales: body.sales,
    checking_account: body.checkingAccount
  });
}

async function updateClientDb(id, newData) {
  return clientSchema.updateOne({ _id: id }, newData);
}

async function removeClientDb(id) {
  return clientSchema.findByIdAndDelete(id);
}

async function updateClientSales(id, invoiceData) {
  return clientSchema.updateOne(
    { _id: id },
    {
      $push: {
        sales: {
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
  retrieveClientDb,
  insertClientDb,
  updateClientDb,
  removeClientDb,
  updateClientSales,
};
