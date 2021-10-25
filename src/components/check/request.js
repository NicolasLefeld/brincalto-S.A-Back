const { checkSchema } = require("../../schema/check");

async function retrieveChecksDb(filter = {}) {
  return checkSchema.find(filter);
}

async function insertChecksDb(check) {
  const created = await checkSchema.create(check);

  return created;
}

async function updateChecksDb(id, newData) {
  return checkSchema.updateOne({ _id: id }, newData);
}

async function retrieveCheckDbById(id, projection = "") {
  return checkSchema.findById(id, projection);
}

async function removeCheckDb(id) {
  return checkSchema.findByIdAndDelete(id);
}

module.exports = {
  retrieveChecksDb,
  insertChecksDb,
  updateChecksDb,
  retrieveCheckDbById,
  removeCheckDb
};
