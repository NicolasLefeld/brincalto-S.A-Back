const {
  retrievePurchasesDb,
  insertPurchasesDb,
  updatePurchasesDb,
  removePurchasesDb,
} = require("./request");
const {
  updateProviderpurchases,
  retrieveProviderDbById,
} = require("../providers/request");

async function retrievePurchases() {
  const purchases = await retrievePurchasesDb();

  const body = await Promise.all(
    purchases.map(async (purchase) => {
      const providerParsed = await retrieveProviderDbById(purchase.provider_id);

      return {
        _id: purchase._id,
        provider: providerParsed
          ? { name: providerParsed.name, _id: providerParsed._id }
          : { name: "Not found", _id: "Not found" },
        date: purchase.date,
        invoice_id: purchase.invoice_id,
        concept: purchase.concept,
        net: purchase.net,
        netPlusIva: purchase.netPlusIva,
        total: purchase.total,
        extras: purchase.extras,
      };
    })
  );

  return purchases.length
    ? { status: 200, body }
    : { status: 404, body: "Any purchases found" };
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

  const created = await insertPurchasesDb(
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

  return created
    ? { status: 201, body: created }
    : { status: 500, body: "An error occurred" };
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

  const { nModified } = await updatePurchasesDb(id, newData);

  return nModified
    ? { status: 200, body: "Updated successfully" }
    : { status: 403, body: "Nothing to update" };
}

async function removePurchases(id) {
  const removed = await removePurchasesDb(id);

  return removed !== null
    ? { status: 200, body: "Deleted successfully" }
    : { status: 404, body: "Any record found" };
}

module.exports = {
  retrievePurchases,
  insertPurchases,
  updatePurchases,
  removePurchases,
};
