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
      const projection = {
        name: 1,
        _id: 1,
      };
      
      const provider = await retrieveProviderDbById(
        purchase.provider_id,
        projection
      );

      return {
        id: purchase._id,
        provider,
        date: purchase.date,
        invoiceId: purchase.invoice_id,
        concept: purchase.concept,
        net: purchase.net,
        netPlusIva: purchase.netPlusIva,
        total: purchase.total,
        extras: purchase.extras,
        status: purchase.status,
      };
    })
  );

  return purchases.length
    ? { status: 200, body }
    : { status: 404, body: "Any purchases found" };
}

async function insertPurchases(body) {
  const created = await insertPurchasesDb(body);

  await updateProviderpurchases(body.providerId, {
    concept: body.concept,
    date: body.date,
    amount: body.total,
    invoice_id: created.id,
  });

  return created
    ? { status: 201, body: created }
    : { status: 500, body: "An error occurred" };
}

async function updatePurchases(id, data) {
  const newData = {
    provider_id: data.providerId,
    date: data.date,
    invoice_id: data.invoiceId,
    concept: data.concept,
    net: data.net,
    netPlusIva: data.netPlusIva,
    total: data.total,
    extras: data.extras,
    status: data.status,
  };

  const { modifiedCount } = await updatePurchasesDb(id, newData);

  return modifiedCount
    ? { status: 200, body: "Updated successfully" }
    : { status: 404, body: "Nothing to update" };
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
