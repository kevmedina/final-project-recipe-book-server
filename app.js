require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();
// require database configuration

require("./configs/db.config");

// Cross-Origin Resource Sharing
// This needs to be set up on the front end sideas well; in axios withCredentials: true
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// make sure express- session is used before the passport
require("./configs/session.config")(app);

require("./configs/passport/passport.config.js")(app);

app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

// const index = require('./routes/index');
// app.use('/', index);
//      |  |  |
//      |  |  |
//      V  V  V
app.use("/", require("./routes/index.routes"));
app.use("/", require("./routes/authentication.routes"));
app.use("/", require("./routes/recipe.routes"));
app.use("/", require("./routes/recipe-book.routes"));

module.exports = app;
