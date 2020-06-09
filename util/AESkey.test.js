import { Decrypt, Encrypt } from "./AESkey";

test("Encrypt aihanjiao account", () => {
  let account = Encrypt("aihanjiao");
  let password = Encrypt("123");
  console.log("Encrypt aihanjiao account = ", account, password);
});

test("Encrypt putongyu account", () => {
  let account = Encrypt("putongyu");
  let password = Encrypt("123");
  console.log("Encrypt putongyu account = ", account, password);
});

test("Encrypt test account", () => {
  let account = Encrypt("test");
  let password = Encrypt("test");
  console.log("Encrypt test account = ", account, password);
});

test("Encrypt denglu account", () => {
  let account = Encrypt("denglu");
  let password = Encrypt("123");
  console.log("Encrypt denglu account = ", account, password);
});

test("Encrypt gis account", () => {
  let account = Encrypt("gis");
  let password = Encrypt("gis.1!");
  console.log("Encrypt gis account = ", account, password);
});
