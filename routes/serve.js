import express from "express";
import serveController from "../controllers/serveController";

const router = express.Router();

router.get("/", serveController.pong);

module.exports = router;
