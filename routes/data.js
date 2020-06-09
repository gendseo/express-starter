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
 * 获取已登录用户的rules
 * @route GET /data/rules
 * @group data - data group
 */
router.get("/rules", dataController.queryRules);

module.exports = router;
