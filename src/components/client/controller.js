const {
  retrieveClientRecords,
  insertClientRecord,
  updateClientRecord,
  removeClientRecord,
} = require("./request");

async function retrieveClient() {
  const records = await retrieveClientRecords();

  const body = records.map(
    ({
      _id,
      name,
      cuit,
      address,
      contacto,
      assigned_products,
      checkingAccount,
    }) => {
      return {
        _id,
        name,
        cuit,
        address,
        contacto,
        assigned_products,
        checkingAccount,
      };
    }
  );

  if (records.length > 0) return { status: 200, body };
  return { status: 404 };
}

async function insertClient(body) {
  const { name, cuit, address, contacto, assigned_products, checkingAccount } =
    body;

  const created = await insertClientRecord(
    name,
    cuit,
    address,
    contacto,
    assigned_products,
    checkingAccount
  );

  if (created) return { status: 201, body: created };
  return { status: 404 };
}

async function updateClient(id, data) {
  const newData = {
    name: data.name,
    cuit: data.cuit,
    address: data.address,
    contacto: data.contacto,
    assigned_products: data.assigned_products,
    checkingAccount: data.checkingAccount,
  };

  const { nModified, ok } = await updateClientRecord(id, newData);

  if (ok) return { status: 200, body: { nModified, ok } };
  return { status: 404 };
}

async function removeClient(id) {
  const removed = await removeClientRecord(id);

  if (removed !== null) return { status: 200 };
  return { status: 404 };
}

module.exports = {
  retrieveClient,
  insertClient,
  updateClient,
  removeClient,
};
