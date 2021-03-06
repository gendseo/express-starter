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

const taskWorkSchema = new Schema(
  {
    name: { type: String, required: true },
    work: { type: Number, required: true },
  },
  { versionKey: false }
);

const taskSchema = new Schema(
  {
    task: { type: String, required: true },
    action: { type: String, required: true },
    participants: { type: [taskWorkSchema], required: true },
    create_time: { type: Date, default: Date.now },
    update_time: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Weekly = new Schema(
  {
    // 事项名称
    title: {
      type: String,
      required: true,
    },
    // 参与人员
    participants: {
      type: [participantSchema],
      required: true,
    },
    // 关键任务
    critical_mission: {
      type: String,
      required: true,
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
      default: Date.now,
    },
    // 更新日期
    update_time: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Weekly", Weekly);
