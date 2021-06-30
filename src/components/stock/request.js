const { oilSchema } = require("../../schema/oil");
const { spareSchema } = require("../../schema/spare");

async function retrieveStockRecords(type) {
  if (type === "oil") return oilSchema.find({ type });
  if (type === "spare") return spareSchema.find({ type });
}

async function insertStockRecord(itemParsed) {
  let created;

  if (itemParsed.type === "oil") created = await oilSchema.create(itemParsed);
  if (itemParsed.type === "spare")
    created = await spareSchema.create(itemParsed);

  return created;
}

async function updateStockRecord(id, newData, type) {
  if (type === "spare") return spareSchema.updateOne({ _id: id }, newData);
  if (type === "oil") return oilSchema.updateOne({ _id: id }, newData);
  if (type === "oilMovement") {
    const oil = await oilSchema.find({ _id: id });
    let availableLitters = oil[0].availableLitters;

    availableLitters -= newData.littersTaken;

    return oilSchema.updateOne(
      { _id: id },
      { $push: { movements: newData }, availableLitters: availableLitters }
    );
  }
}

async function removeStockRecord(id, type) {
  if (type === "oil") return oilSchema.findByIdAndDelete(id);
  if (type === "spare") return spareSchema.findByIdAndDelete(id);
}

module.exports = {
  retrieveStockRecords,
  insertStockRecord,
  updateStockRecord,
  removeStockRecord,
};
