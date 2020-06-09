/*!
 * 2020-6-8
 * Copyright©aihanjiao
 */

"use strict";

import express from "express";
import dataController from "../controllers/data";

const router = express.Router();

/**
 * 获取所有人员的名称列表
 * @route GET /data/users
 * @group data - data group
 */
router.get("/users", dataController.queryAllUsers);

/**
 * 获取所有待办事项的归属项目
 * @route GET /data/ascriptions
 * @group data - data group
 */
router.get("/ascriptions", dataController.queryAllAscriptions);

/**
 * 根据role获取权限列表
 * @route GET /data/rules/{role}
 * @group data - data group
 * @param {string} role.path.required - 角色: staff | manager
 */
router.get("/rules/:role", dataController.queryRoleRules);

module.exports = router;
