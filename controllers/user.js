/*!
 * 2020-6-1
 * Copyright©aihanjiao
 */

"use strict";

import User from "../models/user";

exports.getUsers = async (req, res) => {
  let users = await User.find({}, { _id: 0, account: 1, password: 0 });
  res.send(users);
};
