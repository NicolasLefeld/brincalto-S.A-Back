const dayjs = require("dayjs");
const {
  retrieveStockRecords,
  insertStockRecord,
  updateStockRecord,
  removeStockRecord,
} = require("./request");

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
      comment: item.comment,
    };
  } else if (type === "oil") {
    const oilContainer = item.liters > 20 ? "T" : "B";
    const now = dayjs().format("DDMMYY");
    const oilId = `${oilContainer}${now}`;

    itemParsed = {
      type,
      oilId,
      liters: item.liters,
      availableLitters: item.availableLitters,
      comment: item.comment,
      movements: [],
    };
  }

  const created = await insertStockRecord(itemParsed);

  if (created) return { status: 201, body: created };
  return { status: 500 };
}

async function updateStock(id, type, newData) {
  let newDataParsed;
  
  if (type === "spare") {
    newDataParsed = {
      quantity: newData.quantity,
      product: newData.product,
      comment: newData.comment,
    };
  } else if (type === "oil") {
    newDataParsed = {
      liters: newData.liters,
      availableLitters: newData.availableLitters,
      comment: newData.comment,
    };
  } else if (type === "oilMovement") {
    newDataParsed = {
      littersTaken: newData.littersTaken,
      comment: newData.comment,
      date: new Date(),
    };
  }

  const { nModified, ok } = await updateStockRecord(id, newDataParsed, type);

  if (nModified) return { status: 200, body: { nModified, ok } };
  return { status: 200 };
}

async function removeStock(id, type) {
  const removed = await removeStockRecord(id, type);

  if (removed !== null) return { status: 200 };
  return { status: 404 };
}

module.exports = {
  retrieveStock,
  insertStock,
  updateStock,
  removeStock,
};
