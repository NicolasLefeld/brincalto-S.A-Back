const generatePaymentHtml = require("../../util/generatePaymentHtml");
const generatePdfWithHtml = require("../../util/generatePdfWithHtml");
const { insertChecks } = require("../check/controller");
const { retrieveClientDbById } = require("../clients/request");
const { retrieveCheckDbById, removeCheckDb } = require("../check/request");
const { updateProviderCheckingAccount } = require("../providers/request");
const {
  retrievePaymentsDb,
  insertPaymentsDb,
  removePaymentsDb,
  retrievePaymentsByIdDb,
} = require("./request");

async function retrievePayments() {
  const payments = await retrievePaymentsDb();

  const paymentsParsed = await Promise.all(
    payments.map(async (payment) => {
      const client = await retrieveClientDbById(payment.client_id, "_id name");

      if (client) {
        let paymentParsed = {
          id: payment._id,
          type: payment.type,
          amount: payment.amount,
          client,
          paymentComment: payment.payment_comment,
          date: payment.date,
          check: {},
        };

        if (payment.type === "check") {
          const checkData = await retrieveCheckDbById(
            payment.check_id,
            "_id check_number status"
          );

          if (checkData) {
            paymentParsed.check = {
              id: checkData._id,
              checkNumber: checkData.check_number,
              status: checkData.status,
            };
          }
        } else if (payment.type === "others") {
          paymentParsed.commentOthers = payment.comment_others;
        }

        return paymentParsed;
      } else {
        return payment;
      }
    })
  );

  return payments.length
    ? { status: 200, body: paymentsParsed }
    : { status: 404, body: "Any payment found" };
}

async function insertPayments(body) {
  let payment = {
    type: paymentMethod.paymentMethod,
    amount: body.amount,
    provider_id: body.providerId,
    payment_comment: body.paymentComment,
    date: body.date,
  };

  if (paymentMethod.paymentMethod === "checkThirdParty") {
    const checkInserted = await moveCheckToDelivered(
      body.checkId,
      body.providerId
    );

    payment.check_id = checkInserted._id;
  } else if (paymentMethod.paymentMethod === "checkOwn") {
    const checkInfo = {
      check_number: body.checkNumber,
      bank: body.bank,
      amount: body.amount,
      expiration_date: body.expirationDate,
      from: "Brincalto S.A.",
      to: body.providerId,
      status: "delivered",
      date: body.date,
    };

    const checkInserted = await insertChecks(checkInfo);

    payment.check_id = checkInserted._id;
  } else if (paymentMethod.paymentMethod === "others") {
    payment.comment_others = body.commentOthers;
  }

  const created = await Promise.all(
    insertPaymentsDb(charge),
    updateProviderCheckingAccount(body.client_id, body.amount)
  );

  if (created) return { status: 201, body: created };

  return { status: 500, body: "An error occurred" };
}

async function removePayments(id) {
  const { check_id, amount, client_id } = await retrievePaymentsByIdDb(id);

  // TODO: Modificar el removeCheckDb cuando paga con otra cosa
  const removed = await Promise.all(
    removePaymentsDb(id),
    removeCheckDb(check_id),
    updateProviderCheckingAccount(client_id, amount * -1)
  );

  return removed !== null
    ? { status: 200, body: "Deleted successfully" }
    : { status: 404, body: "Any record found" };
}

async function generatePdf(paymentsIds) {
  const client = await retrieveClientDbById(
    paymentsIds[0].client_id,
    "_id name cuit address contacto"
  );

  const paymentsInfo = await Promise.all(
    paymentsIds.map(async (paymentId) => {
      let paymentIdParsed = {
        id: paymentId._id,
        type: paymentId.type,
        amount: paymentId.amount,
        client,
        paymentComment: paymentId.payment_comment,
        date: paymentId.date,
        check: {},
      };

      if (paymentId.type === "check") {
        const checkData = await retrieveCheckDbById(
          paymentId.check_id,
          "_id check_number status"
        );

        if (checkData) {
          paymentIdParsed.check = {
            id: checkData._id,
            checkNumber: checkData.check_number,
            status: checkData.status,
          };
        }
      } else if (paymentId.type === "others") {
        paymentIdParsed.commentOthers = paymentId.comment_others;
      }

      return paymentIdParsed;
    })
  );

  const html = generatePaymentHtml(paymentsInfo);
  const pdf = await generatePdfWithHtml(html);

  return pdf;
}

module.exports = {
  retrievePayments,
  insertPayments,
  removePayments,
  generatePdf,
};
