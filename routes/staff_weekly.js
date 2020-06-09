/*!
 * 2020-6-1
 * Copyright©aihanjiao
 */

"use strict";

import express from "express";
import staffWeeklyController from "../controllers/staff_weekly";

const router = express.Router();

/**
 * 获取所有人员周报-需要登陆
 * @route GET /staff_weeklys/list
 * @group weeklys/staff - staff weekly list group actions
 * @param {number} year.query.required - 年
 * @param {number} month.query.required - 月
 * @param {number} week.query.required - 周
 */
router.get("/list", staffWeeklyController.queryStaffWeeklyList);

/**
 * 获取已登录人员的周报
 * @route GET /staff_weeklys
 * @group weeklys/staff - staff weekly list group actions
 * @param {number} year.query.required - 年
 * @param {number} month.query.required - 月
 * @param {number} week.query.required - 周
 */
router.get("/", staffWeeklyController.queryStaffWeekly);

/**
 * 创建一个人员周报-需要登陆，该API一般用不到
 * @route POST /staff_weeklys
 * @group weeklys/staff - staff weekly list group actions
 */
router.post("/", staffWeeklyController.createStaffWeekly);

/**
 * 更新人员周报-需要登陆
 * @route PUT /staff_weeklys/{id}
 * @group weeklys/staff - staff weekly list group actions
 * @param {string} id.path.required - id
 */
router.put("/:id", staffWeeklyController.updateStaffWeekly);

/**
 * 删除人员周报-需要登陆，该API一般用不到
 * @route DELETE /staff_weeklys/{id}
 * @group weeklys/staff - staff weekly list group actions
 * @param {string} id.path.required - id
 */
router.delete("/:id", staffWeeklyController.deleteStaffWeekly);

module.exports = router;
