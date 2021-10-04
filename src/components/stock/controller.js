const dayjs = require("dayjs");
const {
  retrieveStockDb,
  insertStockDb,
  updateStockDb,
  removeStockDb,
} = require("./request");

async function retrieveStock(type) {
  const stock = await retrieveStockDb(type);

  return stock.length
    ? { status: 200, body: stock }
    : { status: 404, body: "Any stock found" };
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
      movements: [],
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
      costPerLitter: item.costPerLitter,
      comment: item.comment,
      movements: [],
    };
  }

  const created = await insertStockDb(itemParsed);

  return created
    ? { status: 201, body: created }
    : { status: 500, body: "An error occurred" };
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
      costPerLitter: newData.costPerLitter,
      availableLitters: newData.availableLitters,
      comment: newData.comment,
    };
  } else if (type === "spareMovement") {
    newDataParsed = {
      quantity: newData.quantity,
      comment: newData.comment,
      date: new Date(),
    };
  } else if (type === "oilMovement") {
    newDataParsed = {
      littersTaken: newData.littersTaken,
      comment: newData.comment,
      date: new Date(),
    };
  }

  const { nModified } = await updateStockDb(id, newDataParsed, type);

  return nModified
    ? { status: 200, body: "Updated successfully" }
    : { status: 403, body: "Nothing to update" };
}

async function removeStock(id, type) {
  const removed = await removeStockDb(id, type);

  return removed !== null
    ? { status: 200, body: "Deleted successfully" }
    : { status: 404, body: "Any record found" };
}

module.exports = {
  retrieveStock,
  insertStock,
  updateStock,
  removeStock,
};
