var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");

var tasksRouter = require("./routes/tasks");
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts")
var authRouter = require("./routes/auth");
var app = express();

//var mongoDB = "mongodb://127.0.0.1/database";
var mongoDB = "mongodb+srv://dbuser:Password1@monarch.72uzy.mongodb.net/monarch?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true });
//mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("connected", () => console.log(`Mongoose connection open to ${mongoDB}`));
db.on("disconnected", () => console.log("Mongoose connection disconnected"));
db.on("error", console.error.bind(console, "Mongoose connection error:"));


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/tasks", tasksRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/auth", authRouter);



module.exports = app;
