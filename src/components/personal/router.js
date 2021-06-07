const router = require('express').Router();
const {
  retrievePersonal, insertPersonal, updatePersonal, removePersonal,
} = require('./controller');

router

  .get('/', async (req, res) => {
    const { status, body } = await retrievePersonal();

    res.status(status).json(body);
  })

  .post('/', async (req, res) => {
    const {
      name, lastname, phone, vehicles,
    } = req.body;

    const { status, body } = await insertPersonal(name, lastname, phone, vehicles);

    res.status(status).json(body);
  })

  .put('/:id', async (req, res) => {
    const { id } = req.params;

    const { status, body } = await updatePersonal(id, req.body);

    res.status(status).json(body);
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;

    const { status, body } = await removePersonal(id);

    res.status(status).json(body);
  });

module.exports = router;
