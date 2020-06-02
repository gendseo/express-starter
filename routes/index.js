/*!
 * 2020-5-28
 * Copyright©aihanjiao
 */

"use strict";

import serve from "./serve";
import auth from "./auth";
import user from "./user";
import matter from "./matter";

export default (app) => {
  app.use("/", serve);
  app.use("/auth", auth);
  app.use("/user", user);
  app.use("/matters", matter);
};
