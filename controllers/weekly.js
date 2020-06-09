/*!
 * 2020-6-5
 * Copyright©aihanjiao
 */

"use strict";

import Weekly from "../models/weekly";
import StaffWeekly from "../models/staff_weekly";

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
  if (!validationCreateWeekly(weeklyJSON)) {
    return res.send("项目周报创建请求参数非法");
  }
  try {
    let w = new Weekly({
      title: weeklyJSON.title,
      participants: weeklyJSON.participants,
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
    return res.json(w);
  } catch (err) {
    return res.send(err);
  }
};

exports.deleteWeekly = async (req, res) => {
  if (!req.params.id) {
    return res.send(`id参数非法！`);
  }
  try {
    await Weekly.remove({ _id: req.params.id });
    return res.send(`weekly id=${req.params.id} 删除成功！`);
  } catch (err) {
    return res.send(`weekly id=${req.params.id} 删除失败！`);
  }
};

exports.updateWeekly = async (req, res) => {
  if (!req.params.id) {
    return res.send(`项目周报ID参数非法`);
  }
  let weeklyJSON = req.body;
  if (Object.keys(weeklyJSON).length === 0) {
    return res.send(`项目周报参数为空`);
  }
  try {
    let w = await Weekly.findOne({ _id: req.params.id });
    if (!w) {
      return res.send(`weekly id=${req.params.id} 该记录不存在！`);
    }
    console.log(weeklyJSON);
    let merge = diffAndMergeObject(weeklyJSON, w);
    await Weekly.updateOne({ _id: req.params.id }, merge);
    let want_key = ["week1", "week2", "week3", "week4", "week5", "week6", "week7"];
    let real_key = Object.keys(weeklyJSON).filter(function (v) {
      return want_key.indexOf(v) > -1;
    });
    for (const week of real_key) {
      if (weeklyJSON[week]) {
        if (weeklyJSON[week].target && weeklyJSON[week].target.length > 0) {
          for (let e of weeklyJSON[week].target) {
            for (let p of e.participants) {
              // console.log("-".repeat(50));
              let sw = await StaffWeekly.findOne({
                time: { year: w.time.year, month: w.time.month, week: w.time.week },
                name: p.name,
              });
              if (!sw) {
                let nsw = new StaffWeekly({
                  time: { year: w.time.year, month: w.time.month, week: w.time.week },
                  name: p.name,
                  plan: "",
                  week1: { target: [], reach: [] },
                  week2: { target: [], reach: [] },
                  week3: { target: [], reach: [] },
                  week4: { target: [], reach: [] },
                  week5: { target: [], reach: [] },
                  week6: { target: [], reach: [] },
                  week7: { target: [], reach: [] },
                });
                await nsw.save();
              }
              let f = await StaffWeekly.findOne(
                {
                  time: { year: w.time.year, month: w.time.month, week: w.time.week },
                  name: p.name,
                  [`${week}.target.task`]: e.task,
                },
                { [`${week}.target`]: 1 }
              );
              // console.log(f === null || f === undefined, typeof f);
              // 人员周报不存在该任务
              if (!f) {
                await StaffWeekly.update(
                  {
                    time: {
                      year: w.time.year,
                      month: w.time.month,
                      week: w.time.week,
                    },
                    name: p.name,
                  },
                  {
                    time: {
                      year: w.time.year,
                      month: w.time.month,
                      week: w.time.week,
                    },
                    name: p.name,
                    $push: { [`${week}.target`]: { task: e.task, product: e.product, type: "weekly", work: p.work } },
                    update_time: new Date(),
                  },
                  { upsert: true }
                );
                continue;
              }
              // 存在 需要比对更新字段
              if (f[week].target[0].product !== e.product || f[week].target[0].work !== p.work) {
                await StaffWeekly.updateOne(
                  {
                    time: {
                      year: w.time.year,
                      month: w.time.month,
                      week: w.time.week,
                    },
                    name: p.name,
                    [`${week}.target.task`]: e.task,
                  },
                  { [`${week}.target.$.product`]: e.product, type: "weekly", [`${week}.target.$.work`]: p.work, update_time: new Date() }
                );
                continue;
              }
            }
          }
        }
        if (weeklyJSON[week].reach && weeklyJSON[week].reach.length > 0) {
          for (let e of weeklyJSON[week].reach) {
            for (let p of e.participants) {
              // console.log("-".repeat(50));
              let sw = await StaffWeekly.findOne({
                time: { year: w.time.year, month: w.time.month, week: w.time.week },
                name: p.name,
              });
              if (!sw) {
                let nsw = new StaffWeekly({
                  time: { year: w.time.year, month: w.time.month, week: w.time.week },
                  name: p.name,
                  plan: "",
                  week1: { target: [], reach: [] },
                  week2: { target: [], reach: [] },
                  week3: { target: [], reach: [] },
                  week4: { target: [], reach: [] },
                  week5: { target: [], reach: [] },
                  week6: { target: [], reach: [] },
                  week7: { target: [], reach: [] },
                });
                await nsw.save();
              }
              // console.log({ task: e.task, product: e.product, name: p.name, work: p.work });
              let f = await StaffWeekly.findOne(
                {
                  time: { year: w.time.year, month: w.time.month, week: w.time.week },
                  name: p.name,
                  [`${week}.reach.task`]: e.task,
                },
                { [`${week}.reach`]: 1 }
              );
              // console.log(f === null || f === undefined, typeof f);
              // 人员周报不存在该任务
              if (!f) {
                await StaffWeekly.update(
                  {
                    time: {
                      year: w.time.year,
                      month: w.time.month,
                      week: w.time.week,
                    },
                    name: p.name,
                  },
                  {
                    time: {
                      year: w.time.year,
                      month: w.time.month,
                      week: w.time.week,
                    },
                    name: p.name,
                    $push: { [`${week}.reach`]: { task: e.task, product: e.product, type: "weekly", work: p.work } },
                    update_time: new Date(),
                  },
                  { upsert: true }
                );
                continue;
              }
              // 存在 需要比对更新字段
              if (f[week].reach[0].product !== e.product || f[week].reach[0].work !== p.work) {
                await StaffWeekly.updateOne(
                  {
                    time: {
                      year: w.time.year,
                      month: w.time.month,
                      week: w.time.week,
                    },
                    name: p.name,
                    [`${week}.reach.task`]: e.task,
                  },
                  { [`${week}.reach.$.product`]: e.product, type: "weekly", [`${week}.reach.$.work`]: p.work, update_time: new Date() }
                );
                continue;
              }
            }
          }
        }
      }
    }
    return res.send(`weekly id=${req.params.id} 更新成功！`);
  } catch (err) {
    console.log(err);
    return res.send(`weekly id=${req.params.id} 更新失败！`);
  }
};

function validationCreateWeekly(weekly) {
  if (Object.keys(weekly).length === 0) {
    return false;
  }
  if (!weekly.title || !weekly.critical_mission) {
    return false;
  }
  if (!weekly.participants.length === 0) {
    return false;
  }
  for (const p of weekly.participants) {
    if (!p.name || !p.role) {
      return false;
    }
  }
  if (!weekly.time || !weekly.time.year || !weekly.time.month || !weekly.time.week) {
    return false;
  }
  return true;
}

function diffAndMergeObject(object1, object2) {
  let want_key = ["week1", "week2", "week3", "week4", "week5", "week6", "week7"];
  let real_key = Object.keys(object1).filter(function (v) {
    return want_key.indexOf(v) > -1;
  });
  for (const i of real_key) {
    if (!object1[i].target) {
      object1[i].target = object2[i].target;
    }
    if (!object1[i].reach) {
      object1[i].reach = object2[i].reach;
    }
  }
  return object1;
}
