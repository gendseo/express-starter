/*!
 * 2020-5-29
 * Copyright©aihanjiao
 */

"use strict";

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const participantSchema = new Schema(
  {
    name: String,
    role: String,
  },
  { versionKey: false, _id: false }
);

const matterSchema = new Schema(
  {
    // 事项名称
    title: {
      type: String,
      required: true,
      trim: true,
    },
    // 归属项目
    ascription: {
      type: String,
      required: true,
      trim: true,
    },
    // 参与人员
    participants: {
      type: [participantSchema],
      required: true,
    },
    // 对接人
    docking_people: {
      type: String,
      required: true,
    },
    // 截止日期
    deadline: {
      type: Date,
      required: true,
    },
    // 优先级
    priority: {
      type: String,
      required: true,
    },
    // 当前进度
    progress: {
      type: String,
      required: true,
    },
    // 关键任务
    critical_mission: {
      type: String,
      required: true,
    },
    // 备注
    remark: {
      type: String,
    },
    // 创建日期
    create_time: {
      type: Date,
      required: true,
    },
    // 更新日期
    update_time: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Matter", matterSchema);
