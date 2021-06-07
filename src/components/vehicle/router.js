const router = require('express').Router();
const {
  retrieveVehicle, insertVehicle, updateVehicle, removeVehicle,
} = require('./controller');

router

  .get('/', async (req, res) => {
    const { status, body } = await retrieveVehicle();

    res.status(status).json(body);
  })

  .post('/', async (req, res) => {
    const { plate, comment } = req.body;
    const { status, body } = await insertVehicle(plate, comment);

    res.status(status).json(body);
  })

  .put('/:id', async (req, res) => {
    const { id } = req.params;

    const { status, body } = await updateVehicle(id, req.body);

    res.status(status).json(body);
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;

    const { status, body } = await removeVehicle(id);

    res.status(status).json(body);
  });

module.exports = router;
