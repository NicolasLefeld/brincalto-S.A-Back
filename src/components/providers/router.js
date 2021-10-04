const router = require("express").Router();
const {
  retrieveProvider,
  insertProvider,
  updateProvider,
  removeProvider,
} = require("./controller");

router

  .get("/", async (req, res) => {
    const { status, body } = await retrieveProvider();

    res.status(status).json(body);
  })

  .post("/", async (req, res) => {
    const { status, body } = await insertProvider(req.body);

    res.status(status).json(body);
  })

  .put("/:id", async (req, res) => {
    const { id } = req.params;

    const { status, body } = await updateProvider(id, req.body);

    res.status(status).json(body);
  })

  .delete("/:id", async (req, res) => {
    const { id } = req.params;

    const { status, body } = await removeProvider(id);

    res.status(status).json(body);
  });

module.exports = router;
