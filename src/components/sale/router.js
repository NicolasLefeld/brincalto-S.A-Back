const router = require('express').Router();
const {
  retrieveSale, insertSale, updateSale, removeSale,
} = require('./controller');

router

  .get('/', async (req, res) => {
    const { status, body } = await retrieveSale();

    res.status(status).json(body);
  })

  .post('/', async (req, res) => {
    const {
      date, remitoId, type, cubicMeters, total, clientId, state, driverId,
    } = req.body;
    const { status, body } = await insertSale(
      date, remitoId, type, cubicMeters, total, clientId, state, driverId,
    );

    res.status(status).json(body);
  })

  .put('/:id', async (req, res) => {
    const { id } = req.params;

    const { status, body } = await updateSale(id, req.body);

    res.status(status).json(body);
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;

    const { status, body } = await removeSale(id);

    res.status(status).json(body);
  });

module.exports = router;
