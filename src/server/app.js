const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require('dotenv');
dotenv.config();

const router = require("./routes/index");
const apiRouter = require("./routes/api");


const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// mount our api router here
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", apiRouter);
app.use("/", router);

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, "../client/build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get("*", (req, res) => {
//   console.log("req.path", req.path);
//   res.sendFile(path.join(__dirname + "../client/build/index.html"));
// });

module.exports = app;
