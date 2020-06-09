/*!
 * 2020-5-28
 * Copyright©aihanjiao
 */

"use strict";

import authMiddleware from "../middleware/auth";

import dataRouter from "./data";
import serve from "./serve";
import auth from "./auth";
import matter from "./matter";
import weekly from "./weekly";
import staffWeekly from "./staff_weekly";

export default (app) => {
  app.use(authMiddleware); // 权限验证中间件

  app.use("/", serve);
  app.use("/data", dataRouter);
  app.use("/auth", auth);
  app.use("/matters", matter);
  app.use("/weeklys", weekly);
  app.use("/staff_weeklys", staffWeekly);
};
