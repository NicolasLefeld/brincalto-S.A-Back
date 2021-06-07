const { oilSchema } = require("../../schema/oil");
const { spareSchema } = require("../../schema/spare");

async function retrieveStockRecords(type) {
  return stockSchema.find({ type });
}

async function insertStockRecord(itemParsed) {
  let created;

  if (itemParsed.type === "oil") created = await oilSchema.create(itemParsed);
  if (itemParsed.type === "spare")
    created = await spareSchema.create(itemParsed);

  return created;
}

async function updateStockRecord(id, newData) {
  return stockSchema.updateOne({ _id: id }, newData);
}

async function removeStockRecord(id) {
  return stockSchema.findByIdAndDelete(id);
}

module.exports = {
  retrieveStockRecords,
  insertStockRecord,
  updateStockRecord,
  removeStockRecord,
};
