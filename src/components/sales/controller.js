const generateRemitoHtml = require("../../util/generateRemitoHtml");
const generatePdfWithHtml = require("../../util/generatePdfWithHtml");
const {
  updateClientInvoices,
  retrieveClientDbById,
  updateClientCheckingAccount,
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
      const projection = {
        _id: 1,
        name: 1,
      };

      const client = await retrieveClientDbById(invoice.client_id, projection);

      if (client) {
        return {
          id: invoice._id,
          date: invoice.date,
          invoiceId: invoice.invoice_id,
          net: invoice.net,
          netPlusIva: invoice.netPlusIva,
          total: invoice.total,
          type: invoice.type,
          status: invoice.status,
          client: {
            id: client._id,
            name: client.name,
          },
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

async function retrievePendingInvoices(clientId) {
  const filter = { client_id: clientId, $or: [{ type: "A" }, { type: "B" }] };
  const invoices = await retrieveInvoicesDb(filter);

  const invoicesParsed = await Promise.all(
    invoices.map(async (invoice) => {
      return {
        id: invoice._id,
        date: invoice.date,
        invoiceId: invoice.invoice_id,
        net: invoice.net,
        netPlusIva: invoice.netPlusIva,
        total: invoice.total,
        type: invoice.type,
        status: invoice.status,
        concept: invoice.concept,
      };
    })
  );

  return invoices.length
    ? { status: 200, body: invoicesParsed }
    : { status: 404, body: "Any pending invoice found" };
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
    invoice_id: data.invoiceId,
    net: data.net,
    netPlusIva: data.netPlusIva,
    total: data.total,
    type: data.type,
    status: data.status,
    client_id: data.clientId,
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
      const projection = {
        _id: 1,
        name: 1,
      };

      const product = await retrieveProductDb(
        { _id: remito.product_id },
        projection
      );
      const client = await retrieveClientDbById(remito.client_id, projection);

      if (product[0]) {
        return {
          id: remito._id,
          type: remito.type,
          client: {
            id: client._id,
            name: client.name,
          },
          date: remito.date,
          remitoId: remito.remito_id,
          product:{
            id: product._id,
            name: product.name
          },
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
  let client;
  const remitosInfo = await Promise.all(
    remitos_id.map(async (remito_id) => {
      const remito = await retrieveRemitosByIdDb(remito_id);
      const product = await retrieveProductDbById(remito.product_id);
      if (!client) client = await retrieveClientDbById(remito.client_id);

      return {
        id: remito._id,
        type: remito.type,
        client,
        date: remito.date,
        remitoId: remito.remito_id,
        productId: product,
        observation: remito.observation,
        tons: remito.tons,
        price: remito.price,
        status: remito.status,
        statusId: remito.statusId,
      };
    })
  );

  const html = generateRemitoHtml(remitosInfo);
  const pdf = await generatePdfWithHtml(html);

  return pdf;
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
    client_id: data.clientId,
    date: data.date,
    remito_id: data.remitoId,
    product_id: data.productId,
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
  let total = 0;
  let clientId;
  const lastsId = await retrieveRemitosDb({}, { statusId: 1, _id: 0 });
  const lastsIdParsed = lastsId.map((ids) => (ids.statusId ? ids.statusId : 0));

  const lastId = Math.max(...lastsIdParsed);
  const lastIdPlusOne = lastId + 1;

  const result = await Promise.all(
    data.map(async (remitoId) => {
      const { price, client_id } = await retrieveRemitosByIdDb(data[0]);
      total += price;

      if (!clientId) clientId = client_id;

      return updateRemitosStatusDb(remitoId, lastIdPlusOne);
    })
  );

  updateClientCheckingAccount(clientId, total);

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
  retrievePendingInvoices,
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
