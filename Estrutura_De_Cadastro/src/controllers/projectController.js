const express = require("express");

const authMiddleweres = require("../middlewares/auth");

const router = express.Router();

router.use(authMiddleweres);

router.get("/", (req, res) => {
    res.send({ ok: true, user: req.userId  });
});

module.exports = app => app.use("/projects", router);