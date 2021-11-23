const { extrasSchema } = require("../schema/extras");

async function autoIncrementIdDb(type) {
  const [extras] = await extrasSchema.find();

  if (type === "charge") {
    const chargesLastIdPlusOne = parseInt(extras.chargesLastId) + 1;

    await extrasSchema.updateOne({
      $inc: {
        chargesLastId: chargesLastIdPlusOne,
      },
    });

    return chargesLastIdPlusOne;
  } else if (type === "payment") {
    const paymentsLastIdPlusOne = parseInt(extras.paymentsLastId) + 1;

    await extrasSchema.updateOne({
      $inc: {
        paymentsLastId: paymentsLastIdPlusOne,
      },
    });

    return paymentsLastIdPlusOne;
  }
}

module.exports = autoIncrementIdDb;
