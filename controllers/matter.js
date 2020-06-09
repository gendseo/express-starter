/*!
 * 2020-6-1
 * Copyright©aihanjiao
 */

"use strict";

import Matter from "../models/matter";
// import moment from "moment";

exports.queryMatter = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.send(`matter 查询参数非法`);
  }
  try {
    // 构造查询条件
    let queryAscription = req.body.ascription.length !== 0 ? { ascription: { $in: req.body.ascription } } : {}; // 归属项目
    let queryParticipants = req.body.participants.length !== 0 ? { "participants.name": { $in: req.body.participants } } : {}; // 参与人员
    let queryPriority = req.body.priority.length !== 0 ? { priority: { $in: req.body.priority } } : {}; // 优先级
    let queryProgress = req.body.progress.length !== 0 ? { progress: { $in: req.body.progress } } : {}; // 当前进度
    // 记录构造的查询条件
    console.log(queryAscription, queryParticipants, queryPriority, queryProgress);
    // 查询
    let matters = await Matter.find({
      $and: [queryAscription, queryParticipants, queryPriority, queryProgress],
    });
    return res.send(matters);
  } catch (err) {
    return res.send(err);
  }
};

// 获取所有matter
exports.getMatters = async (req, res) => {
  try {
    let matters = await Matter.find({});
    return res.send(matters);
  } catch (err) {
    return res.send(err);
  }
};

// 创建一个matter
exports.createMatter = async (req, res) => {
  let matterJSON = req.body;
  console.log(matterJSON);
  if (!validationMatterJSON(matterJSON)) {
    return res.send("字段非法");
  }
  let m = new Matter({
    title: matterJSON.title,
    ascription: matterJSON.ascription,
    participants: matterJSON.participants,
    docking_people: matterJSON.docking_people,
    deadline: matterJSON.deadline,
    priority: matterJSON.priority,
    progress: matterJSON.progress,
    critical_mission: matterJSON.critical_mission,
    remark: matterJSON.remark,
    create_time: new Date(),
    update_time: new Date(),
  });
  await m.save();
  res.send(`${m.title} create`);
};

// 更新一个matter
exports.updateMatter = async (req, res) => {
  if (!req.params.id) {
    return res.send(`id参数非法`);
  }
  let matterJSON = req.body;
  if (!validationMatterJSON(matterJSON)) {
    return res.send("字段非法");
  }
  try {
    await Matter.update(
      { _id: req.params.id },
      {
        title: matterJSON.title,
        ascription: matterJSON.ascription,
        participants: matterJSON.participants,
        docking_people: matterJSON.docking_people,
        deadline: matterJSON.deadline,
        priority: matterJSON.priority,
        progress: matterJSON.progress,
        critical_mission: matterJSON.critical_mission,
        remark: matterJSON.remark,
        update_time: new Date(),
      }
    );
    res.send(`matter id=${req.params.id} 更新成功`);
  } catch (err) {
    res.send(`matter id=${req.params.id} 更新失败`);
  }
};

// 删除一个matter
exports.deleteMatter = async (req, res) => {
  if (!req.params.id) {
    return res.send(`id参数非法`);
  }
  try {
    await Matter.remove({ _id: req.params.id });
    res.send(`matter id=${req.params.id} 删除成功`);
  } catch (err) {
    res.send(`matter id=${req.params.id} 删除失败`);
  }
};

function validationMatterJSON(matter) {
  if (!matter) {
    return false;
  }
  if (!matter.title || !matter.ascription || !matter.docking_people || !matter.deadline || !matter.priority || !matter.progress || !matter.critical_mission) {
    return false;
  }
  if (!matter.participants.length === 0) {
    return false;
  }
  for (const p of matter.participants) {
    if (!p.name || !p.role) {
      // console.log(p.name, p.role);
      return false;
    }
  }
  return true;
}
