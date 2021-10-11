const router = require("express").Router();
const {
  retrieveChecks,
} = require("./controller");

router

  .get("/", async (req, res) => {
    const { status, body } = await retrieveChecks();

    res.status(status).json(body);
  })

module.exports = router;
