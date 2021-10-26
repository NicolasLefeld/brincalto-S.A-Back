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
    assigned_products: body.assignedProducts,
    sales: body.sales,
    checking_account: body.checkingAccount,
  });
}

async function updateClientDb(id, newData) {
  return clientSchema.updateOne({ _id: id }, newData);
}

async function removeClientDb(id) {
  return clientSchema.findByIdAndDelete(id);
}

async function updateClientInvoices(body) {
  return clientSchema.updateOne(
    { _id: body.clientId },
    {
      $push: {
        sales: {
          concept: body.concept,
          date: body.date,
          amount: body.total,
          invoice_id: body.invoice_id,
        },
      },
    }
  );
}

async function retrieveClientDbById(id, projection = "") {
  return clientSchema.findById(id, projection);
}

async function updateClientCheckingAccount(clientId, value) {
  return clientSchema.updateOne(
    { _id: clientId },
    {
      $inc: {
        checking_account: value,
      },
    }
  );
}

module.exports = {
  retrieveClientDb,
  insertClientDb,
  updateClientDb,
  removeClientDb,
  updateClientInvoices,
  retrieveClientDbById,
  updateClientCheckingAccount,
};
