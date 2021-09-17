const router = require("express").Router();
const {
  retrieveClient,
  insertClient,
  updateClient,
  removeClient,
} = require("./controller");

router

  .get("/", async (req, res) => {
    const { status, body } = await retrieveClient();

    res.status(status).json(body);
  })

  .post("/", async (req, res) => {
    const { status, body } = await insertClient(req.body);

    res.status(status).json(body);
  })

  .put("/:id", async (req, res) => {
    const { id } = req.params;

    const { status, body } = await updateClient(id, req.body);

    res.status(status).json(body);
  })

  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    const { type } = req.query;

    const { status, body } = await removeClient(id, type);

    res.status(status).json(body);
  });

module.exports = router;
