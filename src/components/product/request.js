const { productSchema } = require("../../schema/product");

async function retrieveProductRecords(filter = {}) {
  return productSchema.find(filter);
}

async function insertProductRecord(name) {
  const created = await productSchema.create({
    name,
  });

  return created;
}

async function updateProductRecord(id, newData) {
  return productSchema.updateOne({ _id: id }, newData);
}

async function removeProductRecord(id) {
  return productSchema.findByIdAndDelete(id);
}

async function retrieveProductRecordsById(id) {
  return productSchema.findById(id);
}

module.exports = {
  retrieveProductRecords,
  insertProductRecord,
  updateProductRecord,
  removeProductRecord,
  retrieveProductRecordsById
};
