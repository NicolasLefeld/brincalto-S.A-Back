const generateHtml = require("../../util/generateHtml");
const generatePdfWithHtml = require("../../util/generatePdfWithHtml");
const {
  updateClientInvoices,
  retrieveClientDbById,
} = require("../clients/request");
const {
  retrieveProductDb,
  retrieveProductDbById,
} = require("../products/request");
const {
  retrieveInvoicesDb,
  insertInvoicesDb,
  updateInvoicesDb,
  removeInvoicesDb,
  retrieveRemitosDb,
  retrieveRemitosByIdDb,
  insertRemitosDb,
  updateRemitosDb,
  updateRemitosStatusDb,
  removeRemitosDb,
} = require("./request");

/* INVOICES */

async function retrieveInvoices() {
  const invoices = await retrieveInvoicesDb();

  const invoicesParsed = await Promise.all(
    invoices.map(async (invoice) => {
      const client = await retrieveClientDbById(invoice.client_id);

      if (client) {
        return {
          _id: invoice._id,
          date: invoice.date,
          invoice_id: invoice.invoice_id,
          net: invoice.net,
          netPlusIva: invoice.netPlusIva,
          total: invoice.total,
          type: invoice.type,
          status: invoice.status,
          client_id: client,
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
  const { modifiedCount } = await updateInvoicesDb(id, newData);

  return modifiedCount
    ? { status: 200, body: "Updated successfully" }
    : { status: 404, body: "Nothing to update" };
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
          statusId: remito.statusId,
        };
      }

      return remito;
    })
  );

  return remitos.length
    ? { status: 200, body: remitosParsed }
    : { status: 404, body: "Any remito found" };
}

async function generatePdf(remitos_id) {
  const remitosInfo = await Promise.all(
    remitos_id.map(async (remito_id) => {
      const remito = await retrieveRemitosByIdDb(remito_id);
      const client = await retrieveClientDbById(remito.client_id);
      const product = await retrieveProductDbById(remito.product_id);

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
        statusId: remito.statusId,
      };
    })
  );

  const html = generateHtml(remitosInfo);
  const pdf = await generatePdfWithHtml(html)

  return pdf
}

async function insertRemitos(body) {
  const created = await insertRemitosDb(body);

  if (created) {
    return { status: 201, body: created };
  }
  return { status: 500, body: "An error occurred" };
}

async function updateRemitos(data) {
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
    statusId: data.statusId,
  };
  const { modifiedCount } = await updateRemitosDb(data.id, newData);

  return modifiedCount
    ? { status: 200, body: "Updated successfully" }
    : { status: 404, body: "Nothing to update" };
}

async function updateRemitoStatus(data) {
  const lastsId = await retrieveRemitosDb({}, { statusId: 1, _id: 0 });
  const lastsIdParsed = lastsId.map((ids) => (ids.statusId ? ids.statusId : 0));

  const lastId = Math.max(...lastsIdParsed);
  const lastIdPlusOne = lastId + 1;

  const result = await Promise.all(
    data.map((remitoId) => {
      return updateRemitosStatusDb(remitoId, lastIdPlusOne);
    })
  );

  return result.every((rs) => rs.modifiedCount === 1)
    ? { status: 200, body: "Updated successfully" }
    : { status: 404, body: "Nothing to update" };
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
  generatePdf,
  insertRemitos,
  updateRemitos,
  updateRemitoStatus,
  removeRemitos,
};
