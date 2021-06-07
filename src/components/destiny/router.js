const router = require('express').Router();
const {
  retrieveDestiny, insertDestiny, updateDestiny, removeDestiny,
} = require('./controller');

router

  .get('/', async (req, res) => {
    const { status, body } = await retrieveDestiny();

    res.status(status).json(body);
  })

  .post('/', async (req, res) => {
    const {
      type, from, to, comment,
    } = req.body;
    const { status, body } = await insertDestiny(type, from, to, comment);

    res.status(status).json(body);
  })

  .put('/:id', async (req, res) => {
    const { id } = req.params;

    const { status, body } = await updateDestiny(id, req.body);

    res.status(status).json(body);
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;

    const { status, body } = await removeDestiny(id);

    res.status(status).json(body);
  });

module.exports = router;
