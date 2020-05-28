/**
 * 2020年5月28日
 * Copyright©aihanjiao
 */

import express from "express";
import session from "express-session";
import connectMongo from "connect-mongo";
import mongoose from "mongoose";
import cors from "cors";
import logger from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import router from "../routes/index";

dotenv.config(); // inject dotenv configuration before creating express instance
const app = express(); // create express instance
const port = process.env.PORT; // use dotenv configuration
const MongoStore = connectMongo(session);
const connection = mongoose.createConnection(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/**
 * set views
 */
app.set("views", path.join(__dirname, "views"));

/**
 * use middlewares
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(cors());
app.use(logger(`:remote-addr - [:date[clf]] ":method :url HTTP/:http-version" :status`));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({ mongooseConnection: connection, ttl: 60 }),
  })
);

/**
 * register router
 */
app.use(router);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

module.exports = app;
