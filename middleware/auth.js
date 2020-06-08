import dotenv from "dotenv";
import dotenvParseVariables from "dotenv-parse-variables";

import User from "../models/user";
import Auth from "../models/auth";

let env = dotenv.config({});
if (env.error) throw env.error;
let config = dotenvParseVariables(env.parsed);

const auth = async (req, res, next) => {
  console.log(req.path, req.url, req.method);
  for (const i of config.AUTH_IGNORE_PATH) {
    if (req.url.includes(i)) {
      return next();
    }
  }
  if (req.method === config.AUTH_IGNORE_METHOD) {
    return next();
  }
  if (!req.session || !req.session.account) {
    return res.status(401).send("Unauthorized");
  }
  let u = await User.findOne({ account: req.session.account });
  let r = await Auth.findOne({ role: u.role, "rules.path": req.path });
  if (!r || !r.rules.length === 0) {
    return res.status(403).send("Forbidden");
  }
  if (r.rules[0].method !== req.method && r.rules[0].method !== "*") {
    return res.status(403).send("Forbidden");
  }
  return next();
};

module.exports = auth;
