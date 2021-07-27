const router = require("express").Router();
const { retrieveUsers, insertUser, login, updateUser, removeUser } = require("./controller");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router

  .get("/list", async (req, res) => {
    const { status, body } = await retrieveUsers();

    res.status(status).json(body);
  })

  .get("/", async (req, res) => {
    const { status, body } = await login(req.body);

    res.status(status).json(body);
  })

  .post("/", async (req, res) => {
    const { status, body } = await insertUser(req.body);

    res.status(status).json(body);
  })

  .put('/:id', async (req, res) => {
    const { id } = req.params;

    const { status, body } = await updateUser(id, req.body);

    res.status(status).json(body);
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;

    const { status, body } = await removeUser(id);

    res.status(status).json(body);
  });

module.exports = router;
