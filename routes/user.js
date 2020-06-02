/*!
 * 2020-6-1
 * Copyright©aihanjiao
 */

"use strict";

import express from "express";
import userController from "../controllers/user";

const router = express.Router();

router.get("/", userController.getUsers);

module.exports = router;
