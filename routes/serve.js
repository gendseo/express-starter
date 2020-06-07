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

router.get("/decrypt", serveController.decrypt);
router.get("/encrypt", serveController.encrypt);

router.get("/set_auth", serveController.setAuth);

module.exports = router;
