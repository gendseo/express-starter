/*!
 * 2020-5-29
 * Copyright©aihanjiao
 */

"use strict";

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    // 账号
    account: {
      type: String,
      unique: true,
      required: true,
    },
    // 密码
    password: {
      type: String,
      required: true,
    },
    // 真实名称
    name: {
      type: String,
      unique: true,
      required: true,
    },
    // 电话
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    // 部门
    department: {
      type: String,
      required: true,
    },
    // 角色
    role: {
      type: String,
      required: true,
      default: "staff",
    },
  },
  {
    versionKey: false,
  }
);

// UserSchema.statics.login = (account, password) =>
//   new Promise((resolve, rejct) => {
//     console.log();
//   });

module.exports = mongoose.model("User", UserSchema);
