const router = require('express').Router();
const {
  retrievePayment, insertPayment, updatePayment, removePayment,
} = require('./controller');

router

  .get('/', async (req, res) => {
    const { status, body } = await retrievePayment();

    res.status(status).json(body);
  })

  .post('/', async (req, res) => {
    const { date, providerId, checkId } = req.body;

    const { status, body } = await insertPayment(date, providerId, checkId);

    res.status(status).json(body);
  })

  .put('/:id', async (req, res) => {
    const { id } = req.params;

    const { status, body } = await updatePayment(id, req.body);

    res.status(status).json(body);
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;

    const { status, body } = await removePayment(id);

    res.status(status).json(body);
  });

module.exports = router;
