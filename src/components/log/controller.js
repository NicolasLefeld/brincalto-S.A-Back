const {
  retrieveLogRecords, insertLogRecord,
} = require('./request');

async function retrieveLog() {
  const records = await retrieveLogRecords();

  if (records.length > 0) return { status: 200, body: records };
  return { status: 404 };
}

async function insertLog(date, description) {
  const created = await insertLogRecord(date, description);

  if (created) return { status: 201, body: created };
  return { status: 404 };
}

module.exports = {
  retrieveLog, insertLog,
};
