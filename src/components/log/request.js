const { logSchema } = require('../../schema/log');

async function retrieveLogRecords(filter = {}) {
  return logSchema.find(filter);
}

async function insertLogRecord(date, description) {
  const created = await logSchema.create({ date, description });

  return created;
}

module.exports = {
  retrieveLogRecords, insertLogRecord,
};
