/*!
 * 2020-5-28
 * Copyright©aihanjiao
 */

"use strict";

import serve from "./serve";

export default (app) => {
  app.use("/", serve);
};
