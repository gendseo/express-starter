/*!
 * 2020-6-1
 * Copyright©aihanjiao
 */

"use strict";

// import m
import Matter from "../models/matter";
import moment from "moment";

// 按条件获取matter
exports.getMatter = async (req, res) => {
  if (Object.keys(req.query).length === 0) {
    return res.send(`query 参数非法！`);
  }
  try {
    console.log(req.query);

    let queryAscription = req.query.ascription ? { ascription: req.query.ascription } : {};
    let queryPriority = req.query.priority ? { priority: req.query.priority } : {};
    let queryProgress = req.query.progress ? { progress: req.query.progress } : {};

    let matters = await Matter.find({
      $and: [queryAscription, queryPriority, queryProgress],
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
    return res.send("字段非法！");
  }
  let m = new Matter({
    title: matterJSON.title,
    ascription: matterJSON.ascription,
    participants: matterJSON.participants,
    docking_people: matterJSON.docking_people,
    deadline: matterJSON.deadline,
    priority: matterJSON.priority,
    progress: matterJSON.progress,
    description: matterJSON.description,
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
    return res.send(`id参数非法！`);
  }
  let matterJSON = req.body;
  if (!validationMatterJSON(matterJSON)) {
    return res.send("字段非法！");
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
        description: matterJSON.description,
        remark: matterJSON.remark,
        update_time: new Date(),
      }
    );
    res.send(`id=${req.params.id} 更新成功！`);
  } catch (err) {
    res.send(`id=${req.params.id} 更新失败！`);
  }
};

// 删除一个matter
exports.deleteMatter = async (req, res) => {
  if (!req.params.id) {
    return res.send(`id参数非法！`);
  }
  try {
    await Matter.remove({ _id: req.params.id });
    res.send(`id=${req.params.id} 删除成功！`);
  } catch (err) {
    res.send(`id=${req.params.id} 删除失败！`);
  }
};

function validationMatterJSON(matter) {
  if (!matter) {
    return false;
  }
  if (!matter.title || !matter.ascription || !matter.participants || !matter.docking_people || !matter.deadline || !matter.priority || !matter.progress || !matter.description) {
    return false;
  }
  return true;
}
