const { retrieveProductDbById } = require("../products/request");
const {
  retrieveClientDb,
  insertClientDb,
  updateClientDb,
  removeClientDb,
} = require("./request");

async function retrieveClient() {
  const clients = await retrieveClientDb();

  const body = await Promise.all(
    clients.map(async (client) => {
      let checkingAccountTotal = client.checking_account;

      client.sales.forEach((sale) => {
        checkingAccountTotal += parseFloat(sale.amount);
      });

      return {
        _id: client._id,
        name: client.name,
        cuit: client.cuit,
        address: client.address,
        contacto: client.contacto,
        sales: client.sales,
        checkingAccount:
          client.sales.length > 0
            ? checkingAccountTotal
            : client.checking_account,
        assignedProducts: await Promise.all(
          client.assigned_products.map(
            async (product) => await retrieveProductDbById(product)
          )
        ),
      };
    })
  );

  return clients.length
    ? { status: 200, body: body }
    : { status: 404, body: "Any clients found" };
}

async function insertClient(body) {
  const created = await insertClientDb(body);

  return created
    ? { status: 201, body: created }
    : { status: 500, body: "An error occurred" };
}

async function updateClient(id, data) {
  const newData = {
    name: data.name,
    cuit: data.cuit,
    address: data.address,
    contacto: data.contacto,
    assigned_products: data.assigned_products,
    sales: data.sales,
  };

  const { nModified } = await updateClientDb(id, newData);

  return nModified
    ? { status: 200, body: "Updated successfully" }
    : { status: 403, body: "Nothing to update" };
}

async function removeClient(id) {
  const removed = await removeClientDb(id);

  return removed !== null
    ? { status: 200, body: "Deleted successfully" }
    : { status: 404, body: "Any record found" };
}

module.exports = {
  retrieveClient,
  insertClient,
  updateClient,
  removeClient,
};
