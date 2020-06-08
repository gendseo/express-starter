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
import path from "path";
import cookieParser from "cookie-parser";
import multer from "multer";
import dotenv from "dotenv";
import dotenvParseVariables from "dotenv-parse-variables";
import helmet from "helmet";
// import csrf from "csurf";
import expressSwaggerGenerator from "express-swagger-generator";

import router from "../routes/index";

let env = dotenv.config({}); // inject dotenv configuration before creating express instance
if (env.error) throw env.error;
let config = dotenvParseVariables(env.parsed);

const app = express(); // create express instance
const port = config.PORT; // use dotenv configuration
const MongoStore = connectMongo(session);
const connection = mongoose.createConnection(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const expressSwagge = expressSwaggerGenerator(app);
let options = {
  swaggerDefinition: {
    info: {
      title: config.SWAGGER_INFO_TITLE,
      description: config.SWAGGER_INFO_DESCRIPTION,
      version: config.SWAGGER_INFO_VERSION,
    },
    host: config.SWAGGER_HOST,
    basePath: config.SWAGGER_BASEPATH,
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
  files: config.SWAGGER_FILES, //Path to the API handle folder
};

mongoose.connect(config.MONGODB_URI);
mongoose.Promise = global.Promise;
const mongodb = mongoose.connection;
mongodb.on("error", console.error.bind(console, "MongoDB 连接错误："));

const upload = multer();

/**
 * set views
 */
// app.set("views", path.join(__dirname, "views"));

/**
 * use middlewares
 */
app.use(upload.array());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.SESSION_SECRET));
app.use(cors());
app.use(helmet());
app.use(logger(config.LOGGER_FORMAT));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: config.SESSION_SECRET,
    store: new MongoStore({ mongooseConnection: connection, ttl: config.SESSION_MAXAGE }),
  })
);

/**
 * register router
 */
router(app);

expressSwagge(options);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

module.exports = app;
