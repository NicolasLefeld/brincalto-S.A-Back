const router = require('express').Router();
const {
  retrieveRemito, insertRemito, updateRemito, removeRemito,
} = require('./controller');

router

  .get('/', async (req, res) => {
    const { status, body } = await retrieveRemito();

    res.status(status).json(body);
  })

  .post('/', async (req, res) => {
    const { number } = req.body;
    const { status, body } = await insertRemito(number);

    res.status(status).json(body);
  })

  .put('/:id', async (req, res) => {
    const { id } = req.params;

    const { status, body } = await updateRemito(id, req.body);

    res.status(status).json(body);
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;

    const { status, body } = await removeRemito(id);

    res.status(status).json(body);
  });

module.exports = router;
