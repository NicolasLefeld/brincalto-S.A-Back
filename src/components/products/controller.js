const {
  retrieveProductDb,
  insertProductDb,
  updateProductDb,
  removeProductDb,
} = require("./request");

async function retrieveProduct() {
  const projection = {
    _id: 1,
    name: 1,
  };
  const products = await retrieveProductDb({}, projection);

  const productParsed = await Promise.all(
    products.map(async (product) => {
      if (product) {
        return {
          id: product._id,
          name: product.name,
        };
      }

      return product;
    })
  );

  return product.productParsed
    ? { status: 200, body: productParsed }
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

  const { modifiedCount } = await updateProductDb(id, newData);

  return modifiedCount
    ? { status: 200, body: "Updated successfully" }
    : { status: 404, body: "Nothing to update" };
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
