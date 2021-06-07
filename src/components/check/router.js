const router = require('express').Router();
const {
  retrieveCheck, insertCheck, updateCheck, removeCheck,
} = require('./controller');

router

  .get('/', async (req, res) => {
    const { status, body } = await retrieveCheck();

    res.status(status).json(body);
  })

  .post('/', async (req, res) => {
    const { number, bank, amount, expiration } = req.body;

    const { status, body } = await insertCheck(number, bank, amount, expiration);

    res.status(status).json(body);
  })

  .put('/:id', async (req, res) => {
    const { id } = req.params;

    const { status, body } = await updateCheck(id, req.body);

    res.status(status).json(body);
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;

    const { status, body } = await removeCheck(id);

    res.status(status).json(body);
  });

module.exports = router;
