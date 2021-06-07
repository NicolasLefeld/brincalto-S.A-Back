const router = require('express').Router();
const {
  retrieveClient, insertClient, updateClient, removeClient,
} = require('./controller');

router

  .get('/', async (req, res) => {
    const { status, body } = await retrieveClient();

    res.status(status).json(body);
  })

  .post('/', async (req, res) => {
    const { name, checkingAccount, comment, destinies } = req.body;

    const { status, body } = await insertClient(name, checkingAccount, comment, destinies);

    res.status(status).json(body);
  })

  .put('/:_id', async (req, res) => {
    const { _id } = req.params;

    const { status, body } = await updateClient(_id, req.body);

    res.status(status).json(body);
  })

  .delete('/:_id', async (req, res) => {
    const { _id } = req.params;

    const { status, body } = await removeClient(_id);

    res.status(status).json(body);
  });

module.exports = router;
