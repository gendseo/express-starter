/*!
 * 2020-5-28
 * Copyright©aihanjiao
 */

"use strict";

import authMiddleware from "../middleware/auth";

import serve from "./serve";
import auth from "./auth";
import user from "./user";
import matter from "./matter";
import weekly from "./weekly";
import staffWeekly from "./staff_weekly";

export default (app) => {
  app.use(authMiddleware);

  app.use("/", serve);
  app.use("/auth", auth);
  app.use("/user", user);
  app.use("/matters", matter);
  app.use("/weeklys", weekly);
  app.use("/weeklys", staffWeekly);
};
