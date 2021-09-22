const { invoiceSchema } = require("../../schema/invoice");
const { remitoSchema } = require("../../schema/remito");

/* INVOICES */

async function retrieveInvoicesDb(filter = {}) {
  filter["$or"] = [{ type: "A" }, { type: "B" }];

  return invoiceSchema.find(filter);
}

async function insertInvoicesDb(body) {
  const created = await invoiceSchema.create({
    date: body.date,
    invoice_id: body.invoice_id,
    amount: body.amount,
    net: body.net,
    netPlusIva: body.netPlusIva,
    total: body.total,
    type: body.type,
    status: body.status,
    client_id: body.client_id,
    concept: body.concept,
  });

  return created;
}

async function updateInvoicesDb(id, newData) {
  return invoiceSchema.updateOne({ _id: id }, newData);
}

async function removeInvoicesDb(id) {
  return invoiceSchema.findByIdAndDelete(id);
}

/* REMITOS */

async function retrieveRemitosDb(filter = {}) {
  filter["$or"] = [{ type: "batea" }, { type: "chasis" }, { type: "ton" }];

  return remitoSchema.find(filter);
}

async function insertRemitosDb(body) {
  const created = await remitoSchema.create({
    type: body.type,
    client_id: body.client_id,
    date: body.date,
    remito_id: body.remito_id,
    product_id: body.product_id,
    observation: body.observation,
    tons: body.tons,
    price: body.price,
    status: body.status,
  });

  return created;
}

async function updateRemitosDb(id, newData) {
  return remitoSchema.updateOne({ _id: id }, newData);
}

async function removeRemitosDb(id) {
  return remitoSchema.findByIdAndDelete(id);
}

module.exports = {
  retrieveInvoicesDb,
  insertInvoicesDb,
  updateInvoicesDb,
  removeInvoicesDb,
  retrieveRemitosDb,
  insertRemitosDb,
  updateRemitosDb,
  removeRemitosDb,
};
