/*!
 * 2020-6-1
 * Copyright©aihanjiao
 */

"use strict";

import express from "express";
import weeklyController from "../controllers/weekly";

const router = express.Router();

router.get("", weeklyController.getWeeklys);

router.post("", weeklyController.createWeekly);
router.put("/:id", weeklyController.updateWeekly);
router.delete("/:id", weeklyController.deleteWeekly);

module.exports = router;
