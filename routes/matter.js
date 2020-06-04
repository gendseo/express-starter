/*!
 * 2020-6-1
 * Copyright©aihanjiao
 */

"use strict";

import express from "express";
import matterController from "../controllers/matter";

const router = express.Router();

router.post("/query", matterController.queryMatter);

router.get("", matterController.getMatters);

/**
 * 创建一个待办事项
 * @route POST /matters
 * @group matters - matter list group actions
 * @param {string} title.formData.required - 事项名称
 * @param {string} ascription.formData.required - 归属项目
 * @param {Array.<string>} participants.formData.required - 参与人员
 * @param {string} docking_people.formData.required - 对接人
 * @param {string} deadline.formData.required - 截止日期
 * @param {string} priority.formData.required - 优先级
 * @param {string} progress.formData.required - 当前进度
 * @param {string} critical_mission.formData.required - 关键任务
 * @param {string} remark.formData - 备注
 */
router.post("/", matterController.createMatter);

/**
 * 更新一个待办事项
 * @route PUT /matters/{id}
 * @group matters - matter list group actions
 * @param {string} id.path.required - id
 * @param {string} title.formData.required - 事项名称
 * @param {string} ascription.formData.required - 归属项目
 * @param {Array.<string>} participants.formData.required - 参与人员
 * @param {string} docking_people.formData.required - 对接人
 * @param {string} deadline.formData.required - 截止日期
 * @param {string} priority.formData.required - 优先级
 * @param {string} progress.formData.required - 当前进度
 * @param {string} critical_mission.formData.required - 关键任务
 * @param {string} remark.formData - 备注
 */
router.put("/:id", matterController.updateMatter);

router.delete("/:id", matterController.deleteMatter);

module.exports = router;
