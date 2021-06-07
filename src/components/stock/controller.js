const {
  retrieveStockRecords,
  insertStockRecord,
  updateStockRecord,
  removeStockRecord,
} = require("./request");
const dayjs = require("dayjs");

async function retrieveStock(type) {
  const records = await retrieveStockRecords(type);

  if (records.length > 0) return { status: 200, body: records };
  return { status: 404 };
}

async function insertStock(item) {
  const { type } = item;
  let itemParsed;

  if (type === "spare") {
    itemParsed = {
      type,
      quantity: item.quantity,
      product: item.product,
    };
  } else if (type === "oil") {
    const now = dayjs();
    const oilId = `T${now.date()}${now.month()}${now.year()}`;

    itemParsed = {
      type,
      oilId,
      liters: item.liters,
      availableLiters: item.availableLiters,
      movements: [],
    };
  }

  const created = await insertStockRecord(itemParsed);

  if (created) return { status: 201, body: created };
  return { status: 404 };
}

async function updateStock(id, newData) {
  const { nModified, ok } = await updateStockRecord(id, newData);

  if (ok) return { status: 200, body: { nModified, ok } };
  return { status: 404 };
}

async function removeStock(id) {
  const removed = await removeStockRecord(id);

  if (removed !== null) return { status: 200 };
  return { status: 404 };
}

module.exports = {
  retrieveStock,
  insertStock,
  updateStock,
  removeStock,
};
