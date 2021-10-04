const router = require("express").Router();
const {
  retrieveLog,
} = require("./controller");

router

  .get("/", async (req, res) => {
    const { status, body } = await retrieveLog();

    res.status(status).json(body);
  })

module.exports = router;
