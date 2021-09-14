const {
  retrievePurchasesRecords,
  insertPurchasesRecord,
  updatePurchasesRecord,
  removePurchasesRecord,
} = require("./request");
const { updateProviderpurchases } = require("../provider/request");

async function retrievePurchases() {
  const records = await retrievePurchasesRecords();

  const body = records.map(
    ({
      _id,
      provider_id,
      date,
      invoice_id,
      concept,
      net,
      netPlusIva,
      total,
      extras,
    }) => {
      return {
        _id,
        provider_id,
        date,
        invoice_id,
        concept,
        net,
        netPlusIva,
        total,
        extras,
      };
    }
  );

  if (records.length > 0) return { status: 200, body };
  return { status: 404 };
}

async function insertPurchases(body) {
  const {
    provider_id,
    date,
    invoice_id,
    concept,
    net,
    netPlusIva,
    total,
    extras,
  } = body;

  const created = await insertPurchasesRecord(
    provider_id,
    date,
    invoice_id,
    concept,
    net,
    netPlusIva,
    total,
    extras
  );

  await updateProviderpurchases(provider_id, {
    concept: concept,
    date: date,
    amount: total,
    invoice_id: created._id,
  });

  if (created) return { status: 201, body: created };
  return { status: 404 };
}

async function updatePurchases(id, data) {
  const newData = {
    provider_id: data.provider_id,
    date: data.date,
    invoice_id: data.invoice_id,
    concept: data.concept,
    net: data.net,
    netPlusIva: data.netPlusIva,
    total: data.total,
    extras: data.extras,
  };

  const { nModified, ok } = await updatePurchasesRecord(id, newData);

  if (ok) return { status: 200, body: { nModified, ok } };
  return { status: 404 };
}

async function removePurchases(id) {
  const removed = await removePurchasesRecord(id);

  if (removed !== null) return { status: 200 };
  return { status: 404 };
}

module.exports = {
  retrievePurchases,
  insertPurchases,
  updatePurchases,
  removePurchases,
};
