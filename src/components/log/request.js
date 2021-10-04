const { logSchema } = require('../../schema/log');

async function retrieveLogDb(filter = {}) {
  return logSchema.find(filter);
}

async function insertLogDb(date, description) {
  const created = await logSchema.create({ date, description });

  return created;
}

module.exports = {
  retrieveLogDb, insertLogDb,
};
