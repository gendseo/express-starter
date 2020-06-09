import config from "config";
import authModel from "../models/auth";

export const authHooks = async () => {
  let hooks = config.get("auth.hooks");
  let keys = Object.keys(hooks);
  for (const key of keys) {
    let fa = await authModel.findOne({ role: key });
    if (!fa) {
      let na = new authModel({
        role: hooks[key].role,
        rules: hooks[key].rules,
      });
      await na.save();
      console.log(`auth hooks ${key} saved`);
      return;
    }
    console.log(`auth hooks ${key} existed`);
  }
};
