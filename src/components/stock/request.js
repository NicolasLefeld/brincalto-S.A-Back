const { oilSchema } = require("../../schema/oil");
const { spareSchema } = require("../../schema/spare");

async function retrieveStockDb(type, projection = { __v: 0 }) {
  if (type === "oil") return oilSchema.find({ type }, projection);
  if (type === "spare") return spareSchema.find({ type }, projection);
}

async function insertStockDb(itemParsed) {
  let created;

  if (itemParsed.type === "oil") created = await oilSchema.create(itemParsed);
  if (itemParsed.type === "spare")
    created = await spareSchema.create(itemParsed);

  return created;
}

async function updateStockDb(id, newData, type) {
  if (type === "spare") return spareSchema.updateOne({ _id: id }, newData);
  if (type === "oil") return oilSchema.updateOne({ _id: id }, newData);
  if (type === "spareMovement") {
    const spare = await spareSchema.find({ _id: id });
    let spareQuantity = spare[0].quantity;

    spareQuantity = spareQuantity + newData.quantity;

    return spareSchema.updateOne(
      { _id: id },
      {
        $push: {
          movements: {
            comment: newData.comment,
            date: newData.date,
            quantityTaken: spareQuantity,
          },
        },
        quantity: newData.quantity,
      }
    );
  }
  if (type === "oilMovement") {
    const oil = await oilSchema.find({ _id: id });
    let availableLitters = oil[0].availableLitters;

    availableLitters = availableLitters - newData.littersTaken;

    return oilSchema.updateOne(
      { _id: id },
      { $push: { movements: newData }, availableLitters: availableLitters }
    );
  }
}

async function removeStockDb(id, type) {
  if (type === "oil") return oilSchema.findByIdAndDelete(id);
  if (type === "spare") return spareSchema.findByIdAndDelete(id);
}

module.exports = {
  retrieveStockDb,
  insertStockDb,
  updateStockDb,
  removeStockDb,
};
