const {
  retrieveProductDb,
  insertProductDb,
  updateProductDb,
  removeProductDb,
} = require("./request");

async function retrieveProduct() {
  const product = await retrieveProductDb();

  return product.length
    ? { status: 200, body: product }
    : { status: 404, body: "Any products found" };
}

async function insertProduct(name) {
  const created = await insertProductDb(name);

  return created
    ? { status: 201, body: created }
    : { status: 500, body: "An error occurred" };
}

async function updateProduct(id, data) {
  const newData = {
    name: data.name,
  };

  const { nModified } = await updateProductDb(id, newData);

  return nModified
    ? { status: 200, body: "Updated successfully" }
    : { status: 403, body: "Nothing to update" };
}

async function removeProduct(id) {
  const removed = await removeProductDb(id);

  return removed !== null
    ? { status: 200, body: "Deleted successfully" }
    : { status: 404, body: "Any record found" };
}

module.exports = {
  retrieveProduct,
  insertProduct,
  updateProduct,
  removeProduct,
};
