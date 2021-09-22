const router = require("express").Router();
const {
  retrieveInvoices,
  insertInvoices,
  updateInvoices,
  removeInvoices,
} = require("./controller");

router

  /* INVOICES */

  .get("/invoices", async (req, res) => {
    const { status, body } = await retrieveInvoices();

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
    const { status, body } = await retrieveInvoices();

    res.status(status).json(body);
  })

  .post("/remitos", async (req, res) => {
    const { status, body } = await insertSales(req.body);

    res.status(status).json(body);
  })

  .put("/remitos/:id", async (req, res) => {
    const { id } = req.params;

    const { status, body } = await updateSales(id, req.body);

    res.status(status).json(body);
  })

  .delete("/remitos/:id", async (req, res) => {
    const { id } = req.params;

    const { status, body } = await removeSales(id);

    res.status(status).json(body);
  })

module.exports = router;
