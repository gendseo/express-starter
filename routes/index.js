import express from "express";

// import hello from "./user";

const router = express.Router();

router.get("/", function (req, res) {
  res.send("hello");
});

export default router;
