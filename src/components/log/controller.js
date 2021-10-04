const { retrieveLogDb, insertLogDb } = require("./request");

async function retrieveLog() {
  const logs = await retrieveLogDb();

  return logs.length
    ? { status: 200, body: logs }
    : { status: 404, body: "Any logs found" };
}

async function insertLog(date, description) {
  const created = await insertLogDb(date, description);

  if (created) return true;
  return false;
}

module.exports = {
  retrieveLog,
  insertLog,
};
