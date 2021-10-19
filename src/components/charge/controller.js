const generateHtml = require("../../util/generateRemitoHtml");
const generatePdfWithHtml = require("../../util/generatePdfWithHtml");
const { insertChecks } = require("../check/controller");
const { retrieveClientDbById } = require("../clients/request");
const { retrieveCheckDbById } = require("../check/request");
const {
  retrieveChargesDb,
  insertChargesDb,
  removeChargesDb,
} = require("./request");

async function retrieveCharges() {
  const charges = await retrieveChargesDb();

  const chargesParsed = await Promise.all(
    charges.map(async (charge) => {
      const client = await retrieveClientDbById(charge.client_id, "_id name");

      if (client) {
        let chargeParsed = {
          id: charge._id,
          type: charge.type,
          amount: charge.amount,
          client,
          paymentComment: charge.payment_comment,
          date: charge.date,
        };

        if (charge.type === "check") {
          const check = await retrieveCheckDbById(
            charge.check_id,
            "_id check_number status"
          );

          chargeParsed.check_id = {
            id: check._id,
            checkNumber: check.check_number,
            status: check.status,
          };
        } else if (charge.type === "others") {
          chargeParsed.commentOthers = charge.comment_others;
        }

        return chargeParsed;
      } else {
        return charge;
      }
    })
  );

  return charges.length
    ? { status: 200, body: chargesParsed }
    : { status: 404, body: "Any charge found" };
}

async function insertCharges(body, paymentMethod) {
  let charge = {
    type: paymentMethod,
    amount: body.amount,
    client_id: body.clientId,
    payment_comment: body.paymentComment,
    date: body.date,
  };

  if (paymentMethod === "check") {
    const checkInfo = {
      check_number: body.checkNumber,
      bank: body.bank,
      expiration_date: body.expirationDate,
      status: "received",
    };
    const checkInserted = await insertChecks(checkInfo);

    charge.check_id = checkInserted._id;
  } else if (paymentMethod === "others") {
    charge.comment_others = body.commentOthers;
  }

  const created = await insertChargesDb(charge);

  // TODO: Impactar sobre c/c del body.clientId
  // TODO: buffer here = pdf

  if (created) return { status: 201, body: { created, pdf: "buffer here" } };

  return { status: 500, body: "An error occurred" };
}

async function removeCharges(id) {
  const removed = await removeChargesDb(id);
  // TODO: borrar el cheque y modificar la c/c
  return removed !== null
    ? { status: 200, body: "Deleted successfully" }
    : { status: 404, body: "Any record found" };
}

module.exports = {
  retrieveCharges,
  insertCharges,
  removeCharges,
};
