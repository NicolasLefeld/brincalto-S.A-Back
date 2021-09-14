const router = require("express").Router();
const {
  retrievePurchases,
  insertPurchases,
  updatePurchases,
  removePurchases,
} = require("./controller");

router

  .get("/", async (req, res) => {
    const { status, body } = await retrievePurchases();

    res.status(status).json(body);
  })

  .post("/", async (req, res) => {
    const { status, body } = await insertPurchases(req.body);

    res.status(status).json(body);
  })

  .put("/:id", async (req, res) => {
    const { id } = req.params;

    const { status, body } = await updatePurchases(id, req.body);

    res.status(status).json(body);
  })

  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    const { type } = req.query;

    const { status, body } = await removePurchases(id, type);

    res.status(status).json(body);
  });

module.exports = router;
