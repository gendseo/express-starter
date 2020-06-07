/*!
 * 2020-6-1
 * Copyright©aihanjiao
 */

"use strict";

import StaffWeekly from "../models/staff_weekly";

exports.getStaffsWeeklys = async (req, res) => {
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

exports.getStaffWeeklys = async (req, res) => {
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

exports.postStaffWeeklys = async (req, res) => {
  return res.send("");
};

exports.putStaffWeeklys = async (req, res) => {
  return res.send("");
};

exports.deleteStaffWeeklys = async (req, res) => {
  return res.send("");
};

// exports.updateStaffWeeklys = async (req, res) => {
//   try {
//     await StaffWeekly.update({}, {}, { upsert: true });
//   } catch (err) {
//     console.log(err);
//   }
// };
