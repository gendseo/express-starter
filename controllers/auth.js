/*!
 * 2020-5-28
 * Copyright©aihanjiao
 */

"use strict";

import User from "../models/user";

import { Decrypt } from "../util/AESkey";

exports.login = async (req, res) => {
  let account = req.body.account;
  let password = req.body.password;

  if (!account || !password) {
    return res.send("字段非法");
  }

  try {
    let u = await User.findOne({ account: account, password: password }, { password: 0 });
    if (u) {
      console.log(Decrypt(u.account), u.name);
      req.session.account = Decrypt(u.account);
      req.session.name = u.name;
      return res.json(u);
    } else {
      return res.send("用户名或密码错误");
    }
  } catch (err) {
    return res.send("登录时发生错误！");
  }
};

exports.register = async (req, res) => {
  let userJSON = req.body;

  if (!validationCreateUser(userJSON)) {
    return res.send("字段非法");
  }

  try {
    let u = await User.findOne({ account: userJSON.account });
    if (u) {
      return res.send("用户已存在");
    }
    let nu = new User({
      account: userJSON.account,
      password: userJSON.password,
      name: userJSON.name,
      phone: userJSON.phone,
      department: userJSON.department,
    });
    await nu.save();
    nu.password = undefined;
    console.log(Decrypt(nu.account), nu.name);
    req.session.account = Decrypt(nu.account);
    req.session.name = nu.name;
    return res.send(nu);
  } catch (err) {
    return res.send("注册时发生错误！");
  }
};

exports.logout = async (req, res) => {
  let name = req.session.name;
  delete req.session.account;
  delete req.session.name;
  res.send(`${name} logout`);
};

function validationCreateUser(userJSON) {
  if (Object.keys(userJSON).length === 0) {
    console.log(console.log(userJSON));
    return false;
  }
  if (!userJSON.account || !userJSON.password || !userJSON.name || !userJSON.phone || !userJSON.department) {
    console.log(console.log(userJSON));
    return false;
  }
  return true;
}
