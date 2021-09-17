const {
  retrieveSalesRecords,
  insertSalesRecord,
  updateSalesRecord,
  removeSalesRecord,
} = require("./request");
const { updateClientSales } = require("../client/request");

async function retrieveSales() {
  const records = await retrieveSalesRecords();

  const body = records.map(
    ({
      _id,
      date,
      invoice_id,
      amount,
      net,
      netPlusIva,
      total,
      type,
      status,
      client_id,
    }) => {
      return {
        _id,
        date,
        invoice_id,
        amount,
        net,
        netPlusIva,
        total,
        type,
        status,
        client_id,
      };
    }
  );

  if (records.length > 0) return { status: 200, body };
  return { status: 404 };
}

async function insertSales(body) {
  const {
    date,
    invoice_id,
    amount,
    net,
    netPlusIva,
    total,
    type,
    status,
    client_id,
    concept
  } = body;

  const created = await insertSalesRecord(
    date,
    invoice_id,
    amount,
    net,
    netPlusIva,
    total,
    type,
    status,
    client_id,
    concept
  );

  await updateClientSales(client_id, {
    concept: concept,
    date,
    amount: total,
    invoice_id,
  });

  if (created) return { status: 201, body: created };
  return { status: 404 };
}

async function updateSales(id, data) {
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
  };
  const { nModified, ok } = await updateSalesRecord(id, newData);

  if (ok) return { status: 200, body: { nModified, ok } };
  return { status: 404 };
}

async function removeSales(id) {
  const removed = await removeSalesRecord(id);

  if (removed !== null) return { status: 200 };
  return { status: 404 };
}

module.exports = {
  retrieveSales,
  insertSales,
  updateSales,
  removeSales,
};
