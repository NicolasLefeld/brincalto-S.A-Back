const {
  updateClientInvoices,
  retrieveClientDbById,
} = require("../clients/request");
const { retrieveProductDb } = require("../products/request");
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

/* INVOICES */

async function retrieveInvoices() {
  const invoices = await retrieveInvoicesDb();

  const invoicesParsed = await Promise.all(
    invoices.map(async (invoice) => {
      const client = await retrieveClientDbById(invoice.client_id);

      if (client[0]) {
        return {
          _id: invoice._id,
          date: invoice.date,
          invoice_id: invoice.invoice_id,
          net: invoice.net,
          netPlusIva: invoice.netPlusIva,
          total: invoice.total,
          type: invoice.type,
          status: invoice.status,
          client_id: { name: client[0].name, _id: client[0]._id },
          concept: invoice.concept,
        };
      }

      return invoice;
    })
  );

  return invoices.length
    ? { status: 200, body: invoicesParsed }
    : { status: 404, body: "Any invoice found" };
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

/* REMITOS */

async function retrieveRemitos() {
  const remitos = await retrieveRemitosDb();

  const remitosParsed = await Promise.all(
    remitos.map(async (remito) => {
      const product = await retrieveProductDb({ _id: remito.product_id });
      const client = await retrieveClientDbById(remito.client_id);

      if (product[0]) {
        return {
          _id: remito._id,
          type: remito.type,
          client_id: client,
          date: remito.date,
          remito_id: remito.remito_id,
          product_id: product,
          observation: remito.observation,
          tons: remito.tons,
          price: remito.price,
          status: remito.status,
        };
      }

      return remito;
    })
  );

  return remitos.length
    ? { status: 200, body: remitosParsed }
    : { status: 404, body: "Any remito found" };
}

async function insertRemitos(body) {
  const created = await insertRemitosDb(body);

  if (created) {
    //await updateClientRemitos(body);

    return { status: 201, body: created };
  }
  return { status: 500, body: "An error occurred" };
}

async function updateRemitos(id, data) {
  const newData = {
    type: data.type,
    client_id: data.client_id,
    date: data.date,
    remito_id: data.remito_id,
    product_id: data.product_id,
    observation: data.observation,
    tons: data.tons,
    price: data.price,
    status: data.status,
  };
  const { nModified } = await updateRemitosDb(id, newData);

  return nModified
    ? { status: 200, body: "Updated successfully" }
    : { status: 403, body: "Nothing to update" };
}

async function updateRemitoStatus(id, data) {
  const newData = {
    status: data.status,
  };
  const { nModified } = await updateRemitosDb(id, newData);

  return nModified
    ? { status: 200, body: "Updated successfully" }
    : { status: 403, body: "Nothing to update" };
}

async function removeRemitos(id) {
  const removed = await removeRemitosDb(id);

  return removed !== null
    ? { status: 200, body: "Deleted successfully" }
    : { status: 404, body: "Any record found" };
}

module.exports = {
  retrieveInvoices,
  insertInvoices,
  updateInvoices,
  removeInvoices,
  retrieveRemitos,
  insertRemitos,
  updateRemitos,
  updateRemitoStatus,
  removeRemitos,
};
