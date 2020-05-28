import express from "express";
import serveController from "../controllers/serveController";

const router = express.Router();

router.get("/", serveController.pong);
router.get("/set", serveController.setSession);
router.get("/get", serveController.getSession);

module.exports = router;
