/*!
 * 2020-6-1
 * Copyright©aihanjiao
 */

"use strict";

import StaffWeekly from "../models/staff_weekly";

exports.queryStaffWeeklyList = async (req, res) => {
  let year = Number(req.query.year);
  let month = Number(req.query.month);
  let week = Number(req.query.week);
  if (!year || !month || !week) {
    return res.send(`query 参数非法`);
  }
  try {
    let weeklys = await StaffWeekly.find({ time: { year: year, month: month, week: week } });
    return res.json(weeklys);
  } catch (err) {
    return res.send(err);
  }
};

exports.queryStaffWeekly = async (req, res) => {
  let year = Number(req.query.year);
  let month = Number(req.query.month);
  let week = Number(req.query.week);
  if (!year || !month || !week) {
    return res.send(`query 参数非法`);
  }
  try {
    let weeklys = await StaffWeekly.find({ time: { year: year, month: month, week: week }, name: req.session.name });
    return res.json(weeklys);
  } catch (err) {
    return res.send(err);
  }
};

exports.createStaffWeekly = async (req, res) => {
  let staffWeeklyJSON = req.body;
  console.log(staffWeeklyJSON);
  if (!validationCreateStaffWeekly(staffWeeklyJSON)) {
    return res.send("人员周报创建请求参数非法");
  }
  try {
    let sw = new StaffWeekly({
      time: staffWeeklyJSON.time,
      name: staffWeeklyJSON.name,
      plan: staffWeeklyJSON.plan,
      week1: staffWeeklyJSON.week1,
      week2: staffWeeklyJSON.week2,
      week3: staffWeeklyJSON.week3,
      week4: staffWeeklyJSON.week4,
      week5: staffWeeklyJSON.week5,
      week6: staffWeeklyJSON.week6,
      week7: staffWeeklyJSON.week7,
    });
    await sw.save();
    return res.json(sw);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};

exports.updateStaffWeekly = async (req, res) => {
  if (!req.params.id) {
    return res.send(`人员周报ID参数非法`);
  }
  let staffWeeklyJSON = req.body;
  if (Object.keys(staffWeeklyJSON).length === 0) {
    return res.send(`项目周报参数为空`);
  }
  try {
    await StaffWeekly.updateOne({ _id: req.params.id }, staffWeeklyJSON);
    return res.json();
  } catch (err) {
    console.log(err);
    res.send(`人员周报 id=${req.params.id} 更新失败`);
  }
};

exports.deleteStaffWeekly = async (req, res) => {
  if (!req.params.id) {
    return res.send(`人员周报ID参数非法`);
  }
  try {
    await StaffWeekly.remove({ _id: req.params.id });
    res.send(`人员周报 id=${req.params.id} 删除成功`);
  } catch (err) {
    res.send(`人员周报 id=${req.params.id} 删除失败`);
  }
};

function validationCreateStaffWeekly(staffWeekly) {
  if (Object.keys(staffWeekly).length === 0) {
    return false;
  }
  if (!staffWeekly.name || !staffWeekly.plan) {
    return false;
  }
  if (!staffWeekly.time || !staffWeekly.time.year || !staffWeekly.time.month || !staffWeekly.time.week) {
    return false;
  }
  let weeks = ["week1", "week2", "week3", "week4", "week5", "week6", "week7"];
  for (const week of weeks) {
    if (!staffWeekly[week] || !staffWeekly[week].target || !StaffWeekly[week].reach) {
      return false;
    }
  }
  return true;
}
