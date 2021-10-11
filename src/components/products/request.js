const { productSchema } = require("../../schema/product");

async function retrieveProductDb(filter = {}, projection = "") {
  return productSchema.find(filter, projection);
}

async function insertProductDb(name) {
  const created = await productSchema.create({
    name,
  });

  return created;
}

async function updateProductDb(id, newData) {
  return productSchema.updateOne({ _id: id }, newData);
}

async function removeProductDb(id) {
  return productSchema.findByIdAndDelete(id);
}

async function retrieveProductDbById(id) {
  return productSchema.findById(id);
}

module.exports = {
  retrieveProductDb,
  insertProductDb,
  updateProductDb,
  removeProductDb,
  retrieveProductDbById,
};
