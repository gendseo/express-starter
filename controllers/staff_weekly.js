/*!
 * 2020-6-1
 * Copyright©aihanjiao
 */

"use strict";

import StaffWeekly from "../models/staff_weekly";

exports.queryStaffsWeekly = async (req, res) => {
  let year = Number(req.query.year);
  let month = Number(req.query.month);
  let week = Number(req.query.week);
  if (!year || !month || !week) {
    return res.send(`query 参数非法！`);
  }
  console.log(year, month, week);
  try {
    let weeklys = await StaffWeekly.find({ time: { year: year, month: month, week: week } });
    return res.send(weeklys);
  } catch (err) {
    return res.send(err);
  }
};

exports.queryStaffWeekly = async (req, res) => {
  let year = Number(req.query.year);
  let month = Number(req.query.month);
  let week = Number(req.query.week);
  if (!year || !month || !week) {
    return res.send(`query 参数非法！`);
  }
  console.log(year, month, week);
  try {
    let weeklys = await StaffWeekly.find({ time: { year: year, month: month, week: week }, name: req.session.name });
    return res.send(weeklys);
  } catch (err) {
    return res.send(err);
  }
};

exports.createStaffWeekly = async (req, res) => {
  return res.send("");
};

exports.updateStaffWeekly = async (req, res) => {
  return res.send("");
};

exports.deleteStaffWeekly = async (req, res) => {
  return res.send("");
};

// exports.updateStaffWeeklys = async (req, res) => {
//   try {
//     await StaffWeekly.update({}, {}, { upsert: true });
//   } catch (err) {
//     console.log(err);
//   }
// };
