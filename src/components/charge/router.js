const router = require("express").Router();
const {
  retrieveCharges,
  insertCharges,
  removeCharges
} = require("./controller");

router

  .get("/", async (req, res) => {
    const { status, body } = await retrieveCharges();

    res.status(status).json(body);
  })

  .post("/:paymentMethod", async (req, res) => {
    const { paymentMethod } = req.params;

    const { status, body } = await insertCharges(req.body, paymentMethod);

    res.status(status).json(body);
  })

  .delete("/:id", async (req, res) => {
    const { id } = req.params;

    const { status, body } = await removeCharges(id);

    res.status(status).json(body);
  })


module.exports = router;
