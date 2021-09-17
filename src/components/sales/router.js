const router = require("express").Router();
const {
  retrieveSales,
  insertSales,
  updateSales,
  removeSales,
} = require("./controller");

router

  .get("/", async (req, res) => {
    const { status, body } = await retrieveSales();

    res.status(status).json(body);
  })

  .post("/", async (req, res) => {
    const { status, body } = await insertSales(req.body);

    res.status(status).json(body);
  })

  .put("/:id", async (req, res) => {
    const { id } = req.params;

    const { status, body } = await updateSales(id, req.body);

    res.status(status).json(body);
  })

  .delete("/:id", async (req, res) => {
    const { id } = req.params;

    const { status, body } = await removeSales(id);

    res.status(status).json(body);
  });

module.exports = router;
