const router = require("express").Router();
const {
  retrieveProduct,
  insertProduct,
  updateProduct,
  removeProduct,
} = require("./controller");

router

  .get("/", async (req, res) => {
    const { status, body } = await retrieveProduct();

    res.status(status).json(body);
  })

  .post("/", async (req, res) => {
    const { name } = req.body;

    const { status, body } = await insertProduct(name);

    res.status(status).json(body);
  })

  .put("/:id", async (req, res) => {
    const { id } = req.params;

    const { status, body } = await updateProduct(id, req.body);

    res.status(status).json(body);
  })

  .delete("/:id", async (req, res) => {
    const { id } = req.params;

    const { status, body } = await removeProduct(id);

    res.status(status).json(body);
  });

module.exports = router;
