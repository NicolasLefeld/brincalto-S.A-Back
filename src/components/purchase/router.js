const router = require('express').Router();
const {
  retrievePurchase, insertPurchase, updatePurchase, removePurchase,
} = require('./controller');

router

  .get('/', async (req, res) => {
    const { status, body } = await retrievePurchase();

    res.status(status).json(body);
  })

  .post('/', async (req, res) => {
    const {
      date, type, concept, net, iva, total, others, comment,
    } = req.body;

    const { status, body } = await insertPurchase(
      date, type, concept, net, iva, total, others, comment,
    );

    res.status(status).json(body);
  })

  .put('/:id', async (req, res) => {
    const { id } = req.params;

    const { status, body } = await updatePurchase(id, req.body);

    res.status(status).json(body);
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;

    const { status, body } = await removePurchase(id);

    res.status(status).json(body);
  });

module.exports = router;
