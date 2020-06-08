/*!
 * 2020-6-1
 * Copyright©aihanjiao
 */

"use strict";

import express from "express";
import weeklyController from "../controllers/weekly";

const router = express.Router();

/**
 * 按年-月-周查询项目周报
 * @route GET /weeklys
 * @group weeklys - weekly list group actions
 * @param {number} year.query.required - 年
 * @param {number} month.query.required - 月
 * @param {number} week.query.required - 周
 */
router.get("", weeklyController.getWeeklys);

/**
 * 创建一个项目周报
 * @route POST /weeklys
 * @group weeklys - weekly list group actions
 */
router.post("", weeklyController.createWeekly);

/**
 * 根据id更新该项目周报
 * @route PUT /weeklys/{id}
 * @group weeklys - weekly list group actions
 * @param {string} id.path.required - id
 */
router.put("/:id", weeklyController.updateWeekly);

/**
 * 删除一个项目周报
 * @route DELETE /weeklys/{id}
 * @group weeklys - weekly list group actions
 * @param {string} id.path.required - id
 */
router.delete("/:id", weeklyController.deleteWeekly);

module.exports = router;
