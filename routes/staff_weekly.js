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
 * @route GET /weeklys/staffs
 * @group weeklys/staff - staff weekly list group actions
 */
router.get("/staffs", staffWeeklyController.queryStaffsWeekly);

/**
 * 获取人员周报-需要登陆，返回登录人员的周报
 * @route GET /weeklys/staff
 * @group weeklys/staff - staff weekly list group actions
 */
router.get("/staff", staffWeeklyController.queryStaffWeekly);

/**
 * 创建一个人员周报-需要登陆，该API一般用不到
 * @route POST /weeklys/staff
 * @group weeklys/staff - staff weekly list group actions
 */
router.post("/staff", staffWeeklyController.createStaffWeekly);

/**
 * 更新人员周报-需要登陆
 * @route PUT /weeklys/{id}/staff
 * @group weeklys/staff - staff weekly list group actions
 * @param {string} id.path.required - id
 */
router.put("/:id/staff", staffWeeklyController.updateStaffWeekly);

/**
 * 删除人员周报-需要登陆，该API一般用不到
 * @route DELETE /weeklys/{id}/staff
 * @group weeklys/staff - staff weekly list group actions
 * @param {string} id.path.required - id
 */
router.delete("/:id/staff", staffWeeklyController.deleteStaffWeekly);

module.exports = router;
