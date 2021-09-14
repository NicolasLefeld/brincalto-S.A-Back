const { clientSchema } = require("../../schema/client");

async function retrieveClientRecords(filter = {}) {
  return clientSchema.find(filter);
}

async function insertClientRecord(name, cuit, address, contacto, assigned_products, checkingAccount) {
  return await clientSchema.create({
    name, cuit, address, contacto, assigned_products, checkingAccount
  });
}

async function updateClientRecord(id, newData) {
  return clientSchema.updateOne({ _id: id }, newData);
}

async function removeClientRecord(id) {
  return clientSchema.findByIdAndDelete(id);
}

module.exports = {
  retrieveClientRecords,
  insertClientRecord,
  updateClientRecord,
  removeClientRecord,
};
