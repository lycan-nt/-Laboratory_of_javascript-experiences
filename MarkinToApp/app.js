const express = require("express");

const todoController = require("./controllers/todoController");

const app = express();

//Set up template engine
app.set("view engine", "ejs");

//static files
app.use(express.static("./public"));

//fire controller
todoController(app);

//Listen to port
app.listen(3000);
console.log("Server online");