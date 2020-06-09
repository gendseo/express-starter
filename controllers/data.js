/*!
 * 2020-6-1
 * Copyright©aihanjiao
 */

"use strict";

import userModel from "../models/user";
import matterModel from "../models/matter";
import authModel from "../models/auth";

exports.queryAllUsers = async (req, res) => {
  try {
    let usersDB = await userModel.aggregate([{ $project: { name: 1 } }]);
    let ignore_users = ["test", "super"];
    let users = [];
    await usersDB.forEach((e) => {
      if (!ignore_users.includes(e.name)) {
        users.push(e.name);
      }
    });
    return res.send(users);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};

exports.queryAllAscriptions = async (req, res) => {
  try {
    let users = await matterModel.distinct("ascription");
    return res.send(users);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};

exports.queryRoleRules = async (req, res) => {
  try {
    let role = req.params.role;
    console.log(req.params);
    if (!role) {
      return res.send("role 字段非法");
    }
    let rules = await authModel.findOne(
      {
        role: role,
      },
      {
        _id: 0,
      }
    );
    return res.json(rules);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};
