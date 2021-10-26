const generateChargeHtml = require("../../util/generateChargeHtml");
const generatePdfWithHtml = require("../../util/generatePdfWithHtml");
const { insertChecks } = require("../check/controller");
const {
  retrieveClientDbById,
  updateClientCheckingAccount,
} = require("../clients/request");
const { retrieveCheckDbById, removeCheckDb } = require("../check/request");
const {
  retrieveChargesDb,
  insertChargesDb,
  removeChargesDb,
  retrieveChargesByIdDb,
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
          check: {},
        };

        if (charge.type === "check") {
          const checkData = await retrieveCheckDbById(
            charge.check_id,
            "_id check_number status"
          );

          if (checkData) {
            chargeParsed.check = {
              id: checkData._id,
              checkNumber: checkData.check_number,
              status: checkData.status,
            };
          }
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

async function insertCharges(body) {
  let charge = {
    type: body.paymentMethod,
    amount: body.amount,
    client_id: body.clientId,
    payment_comment: body.paymentComment,
    date: body.date,
  };

  if (body.paymentMethod === "check") {
    const checkInfo = {
      check_number: body.checkNumber,
      bank: body.bank,
      amount: body.amount,
      expiration_date: body.expirationDate,
      from: body.clientId,
      to: "",
      status: "received",
      date: body.date,
    };

    const checkInserted = await insertChecks(checkInfo);

    charge.check_id = checkInserted._id;
  } else if (body.paymentMethod === "others") {
    charge.comment_others = body.commentOthers;
  }

  const created = await Promise.all(
    insertChargesDb(charge),
    updateClientCheckingAccount(body.client_id, body.amount)
  );

  if (created) return { status: 201, body: { created, pdf: "buffer here" } };

  return { status: 500, body: "An error occurred" };
}

async function removeCharges(id) {
  const { check_id, amount, client_id } = await retrieveChargesByIdDb(id);
  const removed = await Promise.all(
    removeChargesDb(id),
    removeCheckDb(check_id),
    updateClientCheckingAccount(client_id, amount * -1)
  );

  return removed !== null
    ? { status: 200, body: "Deleted successfully" }
    : { status: 404, body: "Any record found" };
}

async function generatePdf(chageresIds) {
  const client = await retrieveClientDbById(
    chageresIds[0].client_id,
    "_id name cuit address contacto"
  );

  const chargesInfo = await Promise.all(
    chageresIds.map(async (chagereId) => {
      const charge = await retrieveChargesByIdDb(chagereId);
      let chargeParsed = {
        id: charge._id,
        type: charge.type,
        amount: charge.amount,
        client,
        paymentComment: charge.payment_comment,
        date: charge.date,
        check: {},
      };

      if (charge.type === "check") {
        const checkData = await retrieveCheckDbById(
          charge.check_id,
          "_id check_number status"
        );

        if (checkData) {
          chargeParsed.check = {
            id: checkData._id,
            checkNumber: checkData.check_number,
            status: checkData.status,
          };
        }
      } else if (charge.type === "others") {
        chargeParsed.commentOthers = charge.comment_others;
      }

      return chargeParsed;
    })
  );

  const html = generateChargeHtml(chargesInfo);
  const pdf = await generatePdfWithHtml(html);

  return pdf;
}

module.exports = {
  retrieveCharges,
  insertCharges,
  removeCharges,
  generatePdf,
};
