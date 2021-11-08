const generatePaymentHtml = require("../../util/generatePaymentHtml");
const generatePdfWithHtml = require("../../util/generatePdfWithHtml");
const { insertChecks, moveCheckToDelivered } = require("../check/controller");
const { retrieveClientDbById } = require("../clients/request");
const { retrieveCheckDbById, removeCheckDb } = require("../check/request");
const {
  updateProviderCheckingAccount,
  retrieveProviderDbById,
} = require("../providers/request");
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
  const { paymentMethod, providerId, amount, date } = body;
  let payment = {
    type: paymentMethod,
    provider_id: providerId,
    payment_comment: body.paymentComment,
    amount,
    date,
  };

  if (paymentMethod === "checkThirdParty") {
    const checkInserted = await moveCheckToDelivered(body.checkId, providerId);

    payment.check_id = checkInserted._id;
  } else if (paymentMethod === "checkOwn") {
    const checkInfo = {
      check_number: body.checkNumber,
      bank: body.bank,
      expiration_date: body.expirationDate,
      from: "Brincalto S.A.",
      to: providerId,
      status: "delivered",
      amount,
      date,
    };

    const checkInserted = await insertChecks(checkInfo);

    payment.check_id = checkInserted._id;
  } else if (paymentMethod === "others") {
    payment.comment_others = body.commentOthers;
  }

  const created = await insertPaymentsDb(payment);
  await updateProviderCheckingAccount(providerId, amount);

  if (created) return { status: 201, body: created };

  return { status: 500, body: "An error occurred" };
}

async function removePayments(id) {
  const { _id, amount, provider_id } = await retrievePaymentsByIdDb(id);
  const { type } = await retrievePaymentsByIdDb(paymentId);

  const removed = await removePaymentsDb(id);
  await updateProviderCheckingAccount(provider_id, amount * -1);
  if (type.includes("check")) {
    await removeCheckDb(_id);
  }

  return removed !== null
    ? { status: 200, body: "Deleted successfully" }
    : { status: 404, body: "Any record found" };
}

async function generatePdf(paymentsIds) {
  const paymentsInfo = await Promise.all(
    paymentsIds.map(async (paymentId) => {
      const payment = await retrievePaymentsByIdDb(paymentId);
      const provider = await retrieveProviderDbById(payment.provider_id);
      const { type } = payment;
      let paymentParsed = {
        id: payment._id,
        type: type,
        amount: payment.amount,
        payment,
        paymentComment: payment.payment_comment,
        date: payment.date,
        provider,
        check: {},
      };

      if (type.includes("check")) {
        const check = await retrieveCheckDbById(payment.check_id);

        if (check) {
          paymentParsed.check = check;
        }
      } else if (type === "others") {
        paymentParsed.commentOthers = payment.comment_others;
      }

      return paymentParsed;
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
