const router = require("express").Router();
const validator = require("express-joi-validation").createValidator({});
const { postStockSchema } = require("./schemas");
const {
  retrieveStock,
  insertStock,
  updateStock,
  removeStock,
} = require("./controller");

router

  .get("/:type", async (req, res) => {
    const { type } = req.params;

    const { status, body } = await retrieveStock(type);

    res.status(status).json(body);
  })

  .post("/", validator.body(postStockSchema), async (req, res) => {
    const { status, body } = await insertStock(req.body);

    res.status(status).json(body);
  })

  .put("/:id", async (req, res) => {
    const { id } = req.params;
    const { type } = req.query

    const { status, body } = await updateStock(id, type, req.body);

    res.status(status).json(body);
  })

  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    const { type } = req.query

    const { status, body } = await removeStock(id, type);

    res.status(status).json(body);
  });

module.exports = router;
