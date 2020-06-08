/*!
 * 2020-5-29
 * Copyright©aihanjiao
 */

"use strict";

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ruleSchema = new Schema(
  {
    path: {
      type: String,
      required: true,
    },
    method: {
      type: [String],
      required: true,
    },
  },
  {
    versionKey: false,
    _id: false,
  }
);

const authSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
    },
    rules: [ruleSchema],
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Auth", authSchema);
