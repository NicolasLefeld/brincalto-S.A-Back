const {
  retrieveProviderRecords,
  insertProviderRecord,
  updateProviderRecord,
  removeProviderRecord,
} = require("./request");

async function retrieveProvider() {
  const records = await retrieveProviderRecords();

  const body = records.map(
    ({ _id, name, purchases, comment, cuit, address }) => {
      let checkingAccount = 0;
      
      purchases.forEach((purchase) => {
        checkingAccount += parseFloat(purchase.amount);
      });

      return {
        _id,
        name,
        purchases,
        checkingAccount,
        comment,
        cuit,
        address,
      };
    }
  );

  if (records.length > 0) return { status: 200, body };
  return { status: 404 };
}

async function insertProvider(name, comment, cuit, address) {
  const created = await insertProviderRecord(name, [], comment, cuit, address);

  if (created) return { status: 201, body: created };
  return { status: 404 };
}

async function updateProvider(id, data) {
  const newData = {
    name: data.name,
    comment: data.comment,
    purchases: data.purchases,
    cuit: data.cuit,
    address: data.address,
  };
  const { nModified, ok } = await updateProviderRecord(id, newData);

  if (ok) return { status: 200, body: { nModified, ok } };
  return { status: 404 };
}

async function removeProvider(id) {
  const removed = await removeProviderRecord(id);

  if (removed !== null) return { status: 200 };
  return { status: 404 };
}

module.exports = {
  retrieveProvider,
  insertProvider,
  updateProvider,
  removeProvider,
};
