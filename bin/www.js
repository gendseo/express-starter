/*!
 * 2020-5-28
 * Copyright©aihanjiao
 */

"use strict";

import express from "express";
import session from "express-session";
import connectMongo from "connect-mongo";
import mongoose from "mongoose";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import multer from "multer";
import helmet from "helmet";
import config from "config";
import expressSwaggerGenerator from "express-swagger-generator";

import router from "../routes/index";
import authHooks from "../middleware/auth_hooks";

process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";

const app = express(); // create express instance
const port = config.get("server.port"); // use dotenv configuration
const MongoStore = connectMongo(session);
const connection = mongoose.createConnection(config.get("mongodb.uri"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const expressSwagge = expressSwaggerGenerator(app);
let options = {
  swaggerDefinition: {
    info: {
      title: config.get("swagger.info.title"),
      description: config.get("swagger.info.description"),
      version: config.get("swagger.info.version"),
    },
    host: config.get("swagger.host"),
    basePath: config.get("swagger.basePath"),
    // produces: ["application/json", "application/xml"],
    // schemes: ["http", "https"],
    // securityDefinitions: {
    //   JWT: {
    //     type: "apiKey",
    //     in: "header",
    //     name: "Authorization",
    //     description: "",
    //   },
    // },
  },
  basedir: __dirname, //app absolute path
  files: config.get("swagger.files"), //Path to the API handle folder
};

mongoose.connect(config.get("mongodb.uri"));
mongoose.Promise = global.Promise;
const mongodb = mongoose.connection;
mongodb.on("error", console.error.bind(console, "MongoDB 连接错误："));

const upload = multer();

/**
 * use middlewares
 */
app.use(upload.array());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.get("session.secret")));
app.use(cors());
app.use(helmet());
app.use(logger(config.get("logger.format")));
app.use(
  session({
    secret: config.get("session.secret"),
    store: new MongoStore({ mongooseConnection: connection, ttl: config.get("session.maxAge") }),
  })
);
app.use(authHooks); // auto register auth hooks from config

/**
 * register router
 */
expressSwagge(options);
router(app);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

module.exports = app;
