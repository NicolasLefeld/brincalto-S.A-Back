const {
  retrieveClientRecords,
  insertClientRecord,
  updateClientRecord,
  removeClientRecord,
} = require("./request");

async function retrieveClient() {
  const records = await retrieveClientRecords();

  const body = records.map(
    ({ _id, name, checking_account, comment, destinies }) => {
      return {
        _id,
        name,
        checkingAccount: checking_account,
        comment,
        destinies: destinies
          .map((destinie) => `${destinie.type} ${destinie.price}$`)
          .join(" / "),
        destiniesRaw: destinies,
      };
    }
  );

  if (records.length > 0) return { status: 200, body };
  return { status: 404 };
}

async function insertClient(name, checkingAccount, comment, destinies) {
  const created = await insertClientRecord(
    name,
    checkingAccount,
    comment,
    destinies
  );

  if (created) return { status: 201, body: created };
  return { status: 404 };
}

async function updateClient(id, data) {
  const newData = {
    name: data.name,
    comment: data.comment,
    checking_account: data.checkingAccount,
    //destinies: data.destinies,
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
