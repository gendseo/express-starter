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
import helmet from "helmet";
// import csrf from "csurf";
import expressSwaggerGenerator from "express-swagger-generator";

import router from "../routes/index";

dotenv.config(); // inject dotenv configuration before creating express instance
const app = express(); // create express instance
const port = process.env.PORT; // use dotenv configuration
const MongoStore = connectMongo(session);
const connection = mongoose.createConnection(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const expressSwagge = expressSwaggerGenerator(app);
let options = {
  swaggerDefinition: {
    info: {
      title: "WMS API DOCS",
      description: "wms rear-end api docs",
      version: "0.0.1",
    },
    host: "221.213.113.170:9999",
    basePath: "/",
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
  files: ["../controllers/*.js", "../routes/*.js"], //Path to the API handle folder
};

mongoose.connect(process.env.MONGODB_URI);
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
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(cors());
app.use(helmet());
app.use(logger(`:remote-addr - [:date[iso]]  ":method  :url  HTTP/:http-version  :response-time ms"  :status`));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({ mongooseConnection: connection, ttl: process.env.SESSION_MAXAGE }),
  })
);
// const ignore_rule = ["/auth", "/api-docs"];
// app.use((req, res, next) => {
//   for (const i of ignore_rule) {
//     if (req.url.includes(i)) {
//       return next();
//     }
//   }
//   if (!req.session || !req.session.username) {
//     return res.status(401).send("Unauthorized");
//   }
//   req.headers["username"] = req.session.username;
//   next();
// });
// app.use(csrf({ cookie: true }));

/**
 * register router
 */
router(app);

expressSwagge(options);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

module.exports = app;
