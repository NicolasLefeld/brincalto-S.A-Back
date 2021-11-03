const { retrieveClientDbById } = require("../clients/request");
const {
  retrieveChecksDb,
  insertChecksDb,
  updateChecksDb,
  removeCheckDb,
} = require("./request");

async function retrieveChecks() {
  const checks = await retrieveChecksDb();

  const checksParsed = await Promise.all(
    checks.map(async (check) => {
      return {
        id: check._id,
        checkNumber: check.check_number,
        bank: check.bank,
        amount: check.amount,
        expirationDate: check.expiration_date,
        from:
          check.from === "Brincalto S.A."
            ? {
                _id: "",
                name: "Brincalto S.A.",
              }
            : await retrieveClientDbById(check.from, "_id name"),
        to: check.to,
        status: check.status,
        date: check.date,
      };
    })
  );

  return checks.length
    ? { status: 200, body: checksParsed }
    : { status: 404, body: "Any check found" };
}

async function insertChecks(body) {
  const created = await insertChecksDb(body);

  return created ? created : "error";
}

async function moveCheckToDelivered(id, providerId) {
  let newData = {
    status: "delivered",
    to: providerId,
  };

  const { modifiedCount } = await updateChecksDb(id, newData);

  return modifiedCount ? true : false;
}

async function removeCheck(id) {
  const removed = await removeCheckDb(id);

  return removed !== null
    ? { status: 200, body: "Deleted successfully" }
    : { status: 404, body: "Any record found" };
}

module.exports = {
  retrieveChecks,
  insertChecks,
  moveCheckToDelivered,
  removeCheck,
};
