/*!
 * 2020-5-28
 * Copyright©aihanjiao
 */

"use strict";

import User from "../models/user";

exports.postLogin = async (req, res) => {
  let account = req.body.account;
  let password = req.body.password;

  if (!account || !password) {
    return res.send("字段非法");
  }

  try {
    let u = await User.findOne({ account: account, password: password });
    if (u) {
      req.session.username = u.account;
      return res.send("登录成功");
    } else {
      return res.send("用户名或密码错误");
    }
  } catch (err) {
    return res.send("登录时发生错误！");
  }
};

exports.register = async (req, res) => {
  let account = req.body.account;
  let password = req.body.password;

  if (!account || !password) {
    return res.send("字段非法");
  }

  try {
    let u = await User.findOne({ account: account });
    if (u) {
      return res.send("用户已存在");
    }
    let nu = new User({ account: account, password: password });
    await nu.save();
    req.session.username = nu.account;
    return res.send(`恭喜 ${nu.account} 注册成功！`);
  } catch (err) {
    return res.send("注册时发生错误！");
  }
};

exports.logout = async (req, res) => {
  let username = req.session.username;
  delete req.session.username;
  res.send(`${username} logout`);
};
