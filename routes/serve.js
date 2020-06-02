/*!
 * 2020-5-28
 * Copyright©aihanjiao
 */

"use strict";

import express from "express";
import serveController from "../controllers/serve";

const router = express.Router();

router.get("/", serveController.pong);
router.get("/set", serveController.setSession);
router.get("/get", serveController.getSession);

module.exports = router;
