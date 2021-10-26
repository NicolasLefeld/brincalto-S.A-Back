const router = require("express").Router();
const {
  retrievePayments,
  insertPayments,
  removePayments,
  generatePdf
} = require("./controller");

router

  .get("/", async (req, res) => {
    const { status, body } = await retrievePayments();

    res.status(status).json(body);
  })

  .post("/", async (req, res) => {
    const { status, body } = await insertPayments(req.body);

    res.status(status).json(body);
  })

  .post("/getPdf", async (req, res) => {
    const buffer = await generatePdf(req.body);

    res.write(buffer,'binary');
    res.end(null, 'binary');
  })

  .delete("/:id", async (req, res) => {
    const { id } = req.params;

    const { status, body } = await removePayments(id);

    res.status(status).json(body);
  })


module.exports = router;
