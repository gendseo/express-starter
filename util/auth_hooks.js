import config from "config";
import authModel from "../models/auth";

export const authHooks = async () => {
  let hooks = config.get("auth.hooks");
  let keys = Object.keys(hooks);
  for (const key of keys) {
    await authModel.update({ role: key }, hooks[key], { upsert: true });
    console.log(`auth hooks ${key} saved`);
  }
};
