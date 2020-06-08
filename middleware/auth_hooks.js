import config from "config";
import authModel from "../models/auth";

const authHooks = async (req, res, next) => {
  let saf = await authModel.findOne({ role: "staff" });

  if (!saf) {
    let staffAuth = new authModel({
      role: config.get("auth.hooks.staff.role"),
      rules: config.get("auth.hooks.staff.rules"),
    });
    await staffAuth.save();
  }

  let maf = await authModel.findOne({ role: "manager" });

  if (!maf) {
    let managerAuth = new authModel({
      role: config.get("auth.hooks.manager.role"),
      rules: config.get("auth.hooks.manager.rules"),
    });
    await managerAuth.save();
  }

  next();
};

module.exports = authHooks;
