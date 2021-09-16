const {
  retrieveProviderRecords,
  insertProviderRecord,
  updateProviderRecord,
  removeProviderRecord,
} = require("./request");

async function retrieveProvider() {
  const records = await retrieveProviderRecords();

  const body = records.map(
    ({ _id, name, purchases, comment, cuit, address, checkingAccount }) => {
      let checkingAccountTotal = checkingAccount;

      purchases.forEach((purchase) => {
        checkingAccountTotal += parseFloat(purchase.amount);
      });

      return {
        _id,
        name,
        purchases,
        checkingAccount: purchases.length > 0 ? checkingAccountTotal : checkingAccount,
        comment,
        cuit,
        address,
      };
    }
  );

  if (records.length > 0) return { status: 200, body };
  return { status: 404 };
}

async function insertProvider(
  name,
  purchases,
  checkingAccount,
  comment,
  cuit,
  address
) {
  const created = await insertProviderRecord(
    name,
    purchases,
    checkingAccount,
    comment,
    cuit,
    address
  );

  if (created) return { status: 201, body: created };
  return { status: 404 };
}

async function updateProvider(id, data) {
  const newData = {
    name: data.name,
    purchases: data.purchase,
    checkingAccount: data.checkingAccount,
    comment: data.comment,
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
