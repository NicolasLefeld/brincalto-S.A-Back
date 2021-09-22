const {
  updateClientInvoices,
  retrieveClientDb,
} = require("../clients/request");
const {
  retrieveInvoicesDb,
  insertInvoicesDb,
  updateInvoicesDb,
  removeInvoicesDb,
  retrieveRemitosDb,
  insertRemitosDb,
  updateRemitosDb,
  removeRemitosDb,
} = require("./request");

async function retrieveInvoices() {
  const sales = await retrieveInvoicesDb();

  const salesParsed = await Promise.all(
    sales.map(async (sale) => {
      if (sale.type === "A") {
        const client = await retrieveClientDb({ _id: sale.client_id });

        if (client[0]) {
          return {
            _id: sale._id,
            date: sale.date,
            invoice_id: sale.invoice_id,
            amount: sale.amount,
            net: sale.net,
            netPlusIva: sale.netPlusIva,
            total: sale.total,
            type: sale.type,
            status: sale.status,
            client_id: { name: client[0].name, _id: client[0]._id },
            concept: sale.concept,
          };
        }
        return sale;
      }
    })
  );

  return sales.length
    ? { status: 200, body: salesParsed }
    : { status: 404, body: "Any sale found" };
}

async function insertInvoices(body) {
  const created = await insertInvoicesDb(body);

  if (created) {
    await updateClientInvoices(body);

    return { status: 201, body: created };
  }
  return { status: 500, body: "An error occurred" };
}

async function updateInvoices(id, data) {
  const newData = {
    date: data.date,
    invoice_id: data.invoice_id,
    amount: data.amount,
    net: data.net,
    netPlusIva: data.netPlusIva,
    total: data.total,
    type: data.type,
    status: data.status,
    client_id: data.client_id,
    concept: data.concept,
  };
  const { nModified } = await updateInvoicesDb(id, newData);

  return nModified
    ? { status: 200, body: "Updated successfully" }
    : { status: 403, body: "Nothing to update" };
}

async function removeInvoices(id) {
  const removed = await removeInvoicesDb(id);

  return removed !== null
    ? { status: 200, body: "Deleted successfully" }
    : { status: 404, body: "Any record found" };
}

module.exports = {
  retrieveInvoices,
  insertInvoices,
  updateInvoices,
  removeInvoices,
};
