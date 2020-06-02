/*!
 * 2020-5-29
 * Copyright©aihanjiao
 */

"use strict";

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Role = new Schema(
  {
    uid: String,
    role: String,
    description: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Role", Role);
