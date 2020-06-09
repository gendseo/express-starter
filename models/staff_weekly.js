/*!
 * 2020-5-29
 * Copyright©aihanjiao
 */

"use strict";

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    task: { type: String, required: true },
    action: { type: String, required: true },
    work: { type: Number, required: true },
  },
  { versionKey: false }
);

const staffWeeklySchema = new Schema(
  {
    // 人员
    name: {
      type: String,
      required: true,
    },
    // 本周计划
    plan: {
      type: String,
    },
    // 周报时间
    time: {
      year: Number, // 年 eg: 2020
      month: Number, // 月 eg: 6
      week: Number, // 日 eg: 1
    },
    // 周一
    week1: {
      target: [taskSchema],
      reach: [taskSchema],
    },
    // 周二
    week2: {
      target: [taskSchema],
      reach: [taskSchema],
    },
    // 周三
    week3: {
      target: [taskSchema],
      reach: [taskSchema],
    },
    // 周四
    week4: {
      target: [taskSchema],
      reach: [taskSchema],
    },
    // 周五
    week5: {
      target: [taskSchema],
      reach: [taskSchema],
    },
    // 周六
    week6: {
      target: [taskSchema],
      reach: [taskSchema],
    },
    // 周天
    week7: {
      target: [taskSchema],
      reach: [taskSchema],
    },
    // 创建日期
    create_time: {
      type: Date,
      required: true,
      default: Date.now,
    },
    // 更新日期
    update_time: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("StaffWeekly", staffWeeklySchema);
