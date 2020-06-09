import User from "../models/user";
import Auth from "../models/auth";
import config from "config";
import { Encrypt } from "../util/AESkey";

const auth = async (req, res, next) => {
  console.log(req.path, req.url, req.method);
  for (const i of config.get("auth.ignore.path")) {
    if (req.url.includes(i)) {
      return next();
    }
  }
  if (req.method === config.get("auth.ignore.method")) {
    return next();
  }
  if (!req.session || !req.session.account) {
    return res.status(401).send("Unauthorized");
  }
  let u = await User.findOne({ account: Encrypt(req.session.account) });
  if (req.method === "PUT" || req.method === "DELETE") {
    if (u.role === "manager" || u.role === "super") {
      return next();
    } else {
      return res.status(403).send("Forbidden");
    }
  }
  let r = await Auth.findOne({ role: u.role, "rules.path": req.path }, { rules: { $elemMatch: { path: req.path } }, _id: 0 });
  // let r = await Auth.find({ role: u.role, "rules.method": { $in: [req.method] } }, { rules: { $elemMatch: { method: { $in: [req.method] } } }, _id: 0 });
  if (!r || !r.rules.length === 0) {
    return res.status(403).send("Forbidden");
  }
  if (r.rules[0].method.includes("*") || r.rules[0].method.includes(req.method)) {
    return next();
  }
  return res.status(403).send("Forbidden");
};

module.exports = auth;
