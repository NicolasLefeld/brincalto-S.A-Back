const generatePaymentHtml = require("../../util/generatePaymentHtml");
const generatePdfWithHtml = require("../../util/generatePdfWithHtml");
const { insertChecks, changeCheckStatus } = require("../check/controller");
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
      const provider = await retrieveProviderDbById(
        payment.provider_id,
        "_id name"
      );

      if (provider) {
        let paymentParsed = {
          id: payment._id,
          type: payment.type,
          amount: payment.amount,
          provider,
          paymentComment: payment.payment_comment,
          date: payment.date,
          check: {},
        };

        if (payment.type.includes("check")) {
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
    await changeCheckStatus(body.checkId, providerId);

    payment.check_id = body.checkId;
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
  await updateProviderCheckingAccount(providerId, amount * -1);

  if (created) return { status: 201, body: created };

  return { status: 500, body: "An error occurred" };
}

async function removePayments(id) {
  const {
    _id: paymentId,
    type,
    check_id,
    amount,
    provider_id,
  } = await retrievePaymentsByIdDb(id);

  await updateProviderCheckingAccount(provider_id, amount * -1);

  const removed = await removePaymentsDb(paymentId);

  if (type === "checkOwn") {
    //const { _id: checkId } = await retrieveCheckDbById(check_id);

    await removeCheckDb(check_id);
  } else if (type === "checkThirdParty") {
    await changeCheckStatus(check_id, provider_id, "received");
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

  const html = await generatePaymentHtml(paymentsInfo);
  const pdf = await generatePdfWithHtml(html);

  return pdf;
}

module.exports = {
  retrievePayments,
  insertPayments,
  removePayments,
  generatePdf,
};
