/*!
 * 2020-6-1
 * Copyright©aihanjiao
 */

"use strict";

import Weekly from "../models/weekly";

exports.getWeeklys = async (req, res) => {
  let year = Number(req.query.year);
  let month = Number(req.query.month);
  let week = Number(req.query.week);
  if (!year || !month || !week) {
    return res.send(`query 参数非法！`);
  }
  console.log(year, month, week);
  try {
    let weeklys = await Weekly.find({ time: { year: year, month: month, week: week } });
    return res.send(weeklys);
  } catch (err) {
    return res.send(err);
  }
};

exports.createWeekly = async (req, res) => {
  let weeklyJSON = req.body;
  console.log(weeklyJSON);
  try {
    let w = new Weekly({
      title: weeklyJSON.title,
      participants: [],
      critical_mission: weeklyJSON.critical_mission,
      time: weeklyJSON.time,
      week1: weeklyJSON.week1,
      week2: weeklyJSON.week2,
      week3: weeklyJSON.week3,
      week4: weeklyJSON.week4,
      week5: weeklyJSON.week5,
      week6: weeklyJSON.week6,
      week7: weeklyJSON.week7,
    });
    await w.save();
    return res.send(`weekly ${weeklyJSON.title} create!`);
  } catch (err) {
    return res.send(err);
  }
};

exports.updateWeekly = async (req, res) => {
  if (!req.params.id) {
    return res.send(`id参数非法！`);
  }
  let weeklyJSON = req.body;
  console.log(weeklyJSON);
  try {
    await Weekly.update({ _id: req.params.id }, weeklyJSON);
    return res.send(`weekly id=${req.params.id} 更新成功！`);
  } catch (err) {
    return res.send(`weekly id=${req.params.id} 更新失败！`);
  }
};

exports.deleteWeekly = async (req, res) => {
  if (!req.params.id) {
    return res.send(`id参数非法！`);
  }
  try {
    await Weekly.remove({ _id: req.params.id });
    res.send(`weekly id=${req.params.id} 删除成功！`);
  } catch (err) {
    res.send(`weekly id=${req.params.id} 删除失败！`);
  }
};
