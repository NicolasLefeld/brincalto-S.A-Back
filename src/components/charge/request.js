const { chargeSchema } = require("../../schema/charge");

async function retrieveChargesDb(filter = {}) {
  filter["$or"] = [{ type: "check" }, { type: "cash" }, { type: "others" }];

  return chargeSchema.find(filter);
}

async function retrieveChargesByIdDb(id) {
  return chargeSchema.findById(id);
}

async function insertChargesDb(charge) {
  const created = await chargeSchema.create(charge);

  return created;
}

async function removeChargesDb(id) {
  return chargeSchema.findByIdAndDelete(id);
}
module.exports = {
  retrieveChargesDb,
  insertChargesDb,
  removeChargesDb,
  retrieveChargesByIdDb,
};
