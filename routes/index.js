import express from "express";

import serveRoute from "./serve";

const router = express.Router();

router.use("/", serveRoute);

module.exports = router;
