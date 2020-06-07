/*!
 * 2020-5-28
 * Copyright©aihanjiao
 */

"use strict";

exports.pong = (req, res) => {
  res.send("hello");
};

exports.setSession = (req, res) => {
  req.session.username = "oop";
  res.send("set session.username = oop");
};

exports.getSession = (req, res) => {
  if (req.session.username) {
    res.send(`hello ${req.session.username}`);
  } else {
    res.send(`no username in session`);
  }
};

import { Decrypt, Encrypt } from "../util/AESkey";

exports.decrypt = (req, res) => {
  let encode = req.query.encode;
  let e = Decrypt(encode);
  console.log(e, JSON.stringify(e));
  res.send(e);
};

exports.encrypt = (req, res) => {
  let e = Encrypt("aihanjiao");
  res.send(e);
};

import Auth from "../models/auth";

exports.setAuth = async (req, res) => {
  let a = new Auth({ role: "staff", rules: [{ path: "/", method: "GET" }] });
  await a.save();
  res.send(a);
};
