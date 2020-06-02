/*!
 * 2020-5-29
 * Copyright©aihanjiao
 */

"use strict";

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    account: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
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
