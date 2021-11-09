const router = require("express").Router();
const {
  retrieveInvoices,
  retrievePendingInvoices,
  generatePdf,
  insertInvoices,
  updateInvoices,
  removeInvoices,
  retrieveRemitos,
  insertRemitos,
  updateRemitos,
  updateRemitoStatus,
  removeRemitos,
} = require("./controller");

router

  /* INVOICES */

  .get("/invoices", async (req, res) => {
    const { status, body } = await retrieveInvoices();

    res.status(status).json(body);
  })

  .get("/invoices/pending/:id", async (req, res) => {
    const { id } = req.params;

    const { status, body } = await retrievePendingInvoices(id);

    res.status(status).json(body);
  })

  .post("/invoices", async (req, res) => {
    const { status, body } = await insertInvoices(req.body);

    res.status(status).json(body);
  })

  .put("/invoices/:id", async (req, res) => {
    const { id } = req.params;

    const { status, body } = await updateInvoices(id, req.body);

    res.status(status).json(body);
  })

  .delete("/invoices/:id", async (req, res) => {
    const { id } = req.params;

    const { status, body } = await removeInvoices(id);

    res.status(status).json(body);
  })

  /* REMITOS */

  .get("/remitos", async (req, res) => {
    const { status, body } = await retrieveRemitos();

    res.status(status).json(body);
  })

  .post("/remitos/getPdf", async (req, res) => {
    const buffer = await generatePdf(req.body);

    res.write(buffer,'binary');
    res.end(null, 'binary');
  })

  .post("/remitos", async (req, res) => {
    const { status, body } = await insertRemitos(req.body);

    res.status(status).json(body);
  })

  .put("/remitos", async (req, res) => {
    const { status, body } = await updateRemitos(req.body);

    res.status(status).json(body);
  })

  .put("/remitos/markAsProcessed", async (req, res) => {
    const { status, body } = await updateRemitoStatus(req.body);

    res.status(status).json(body);
  })

  .delete("/remitos/:id", async (req, res) => {
    const { id } = req.params;

    const { status, body } = await removeRemitos(id);

    res.status(status).json(body);
  });

module.exports = router;
