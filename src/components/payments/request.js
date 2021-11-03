const { paymentSchema } = require("../../schema/payment");

async function retrievePaymentsDb(filter = {}) {
  //filter["$or"] = [{ type: "check" }, { type: "cash" }, { type: "others" }];

  return paymentSchema.find(filter);
}

async function retrievePaymentsByIdDb(id) {
  return paymentSchema.findById(id);
}

async function insertPaymentsDb(payment) {
  const created = await paymentSchema.create(payment);

  return created;
}

async function removePaymentsDb(id) {
  return paymentSchema.findByIdAndDelete(id);
}
module.exports = {
  retrievePaymentsDb,
  insertPaymentsDb,
  removePaymentsDb,
  retrievePaymentsByIdDb,
};
