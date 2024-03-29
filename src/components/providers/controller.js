const {
  retrieveProviderDb,
  insertProviderDb,
  updateProviderDb,
  removeProviderDb,
} = require("./request");

async function retrieveProvider() {
  const providers = await retrieveProviderDb();

  const body = providers.map((provider) => {
    let checkingAccountTotal = provider.checking_account;

    provider.purchases.forEach((purchase) => {
      checkingAccountTotal += parseFloat(purchase.amount);
    });

    return {
      id: provider._id,
      name: provider.name,
      purchases: provider.purchases,
      checkingAccount:
        provider.purchases.length > 0
          ? checkingAccountTotal
          : provider.checking_account,
      comment: provider.comment,
      cuit: provider.cuit,
      address: provider.address,
    };
  });

  return providers.length
    ? { status: 200, body }
    : { status: 404, body: "Any providers found" };
}

async function insertProvider(body) {
  const created = await insertProviderDb(body);

  return created
    ? { status: 201, body: created }
    : { status: 500, body: "An error occurred" };
}

async function updateProvider(id, data) {
  const newData = {
    name: data.name,
    purchases: data.purchase,
    checking_account: data.checkingAccount,
    comment: data.comment,
    cuit: data.cuit,
    address: data.address,
  };
  const { modifiedCount } = await updateProviderDb(id, newData);

  return modifiedCount
    ? { status: 200, body: "Updated successfully" }
    : { status: 404, body: "Nothing to update" };
}

async function removeProvider(id) {
  const removed = await removeProviderDb(id);

  return removed !== null
    ? { status: 200, body: "Deleted successfully" }
    : { status: 404, body: "Any record found" };
}

module.exports = {
  retrieveProvider,
  insertProvider,
  updateProvider,
  removeProvider,
};
