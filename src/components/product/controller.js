const {
  retrieveProductRecords,
  insertProductRecord,
  updateProductRecord,
  removeProductRecord,
} = require("./request");

async function retrieveProduct() {
  const records = await retrieveProductRecords();

  const body = records.map(({ _id, name }) => {
    return {
      _id,
      name,
    };
  });

  if (records.length > 0) return { status: 200, body };
  return { status: 404 };
}

async function insertProduct(name) {
  const created = await insertProductRecord(name);

  if (created) return { status: 201, body: created };
  return { status: 404 };
}

async function updateProduct(id, data) {
  const newData = {
    name: data.name,
  };
console.log(data, id);
  const { nModified, ok } = await updateProductRecord(id, newData);

  if (ok) return { status: 200, body: { nModified, ok } };
  return { status: 404 };
}

async function removeProduct(id) {
  const removed = await removeProductRecord(id);

  if (removed !== null) return { status: 200 };
  return { status: 404 };
}

module.exports = {
  retrieveProduct,
  insertProduct,
  updateProduct,
  removeProduct,
};
