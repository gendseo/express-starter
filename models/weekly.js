/*!
 * 2020-5-29
 * Copyright©aihanjiao
 */

"use strict";

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Task = new Schema(
  {
    task: { type: String, required: true, trim: true },
    action: { type: String, required: true, trim: true },
    participants: { type: [String], required: true },
    time: { type: Number, required: true },
  },
  { versionKey: false, _id: false }
);

const Weekly = new Schema(
  {
    // 事项名称
    title: {
      type: String,
      required: true,
      trim: true,
    },
    // 参与人员
    participants: {
      type: [String],
      required: true,
    },
    // 关键任务
    critical_mission: {
      type: String,
      required: true,
    },
    time: {
      year: Number,
      month: Number,
      week: Number,
    },
    week1: {
      target: [Task],
      reach: [Task],
    },
    week2: {
      target: [Task],
      reach: [Task],
    },
    week3: {
      target: [Task],
      reach: [Task],
    },
    week4: {
      target: [Task],
      reach: [Task],
    },
    week5: {
      target: [Task],
      reach: [Task],
    },
    week6: {
      target: [Task],
      reach: [Task],
    },
    week7: {
      target: [Task],
      reach: [Task],
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Weekly", Weekly);
