import express from "express";
import cors from "cors";
import logger from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import router from "../routes/index";

dotenv.config();
const app = express();
const port = process.env.PORT;

/**
 * set views
 */
app.set("views", path.join(__dirname, "views"));

/**
 * use middlewares
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(logger(`:remote-addr - [:date[clf]] ":method :url HTTP/:http-version" :status`));
app.use(express.static(path.join(__dirname, "public")));

/**
 * use router
 */
app.use("/", router);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

module.exports = app;
