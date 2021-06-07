const {
  retrieveProviderRecords, insertProviderRecord, updateProviderRecord, removeProviderRecord,
} = require('./request');

async function retrieveProvider() {
  const records = await retrieveProviderRecords();

  const body = records.map(
    ({ _id, name, checking_account, comment, destinies }) => {
      return {
        _id,
        name,
        checkingAccount: checking_account,
        comment,
      };
    }
  );

  if (records.length > 0) return { status: 200, body };
  return { status: 404 };
}

async function insertProvider(name, checkingAccount, comment) {
  const created = await insertProviderRecord(name, checkingAccount, comment);

  if (created) return { status: 201, body: created };
  return { status: 404 };
}

async function updateProvider(id, data) {
  const newData = {
    name: data.name,
    comment: data.comment,
    checking_account: data.checkingAccount,
    //destinies: data.destinies,
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
  retrieveProvider, insertProvider, updateProvider, removeProvider,
};
