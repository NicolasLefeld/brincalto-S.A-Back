const router = require("express").Router();
const {
  retrieveCharges,
  insertCharges,
  removeCharges,
  generatePdf
} = require("./controller");

router

  .get("/", async (req, res) => {
    const { status, body } = await retrieveCharges();

    res.status(status).json(body);
  })

  .post("/", async (req, res) => {
    const { status, body } = await insertCharges(req.body);

    res.status(status).json(body);
  })

  .post("/getPdf", async (req, res) => {
    const buffer = await generatePdf(req.body);

    res.write(buffer,'binary');
    res.end(null, 'binary');
  })

  .delete("/:id", async (req, res) => {
    const { id } = req.params;

    const { status, body } = await removeCharges(id);

    res.status(status).json(body);
  })


module.exports = router;
