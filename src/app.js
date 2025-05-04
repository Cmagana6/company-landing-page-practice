const express = require("express");
const path = require("path");
const itemsRoutes = require("./routes/itemsRoutes");
const logger = require("./middleware/logger");

const app = express();

app.use(express.json()); //Middleware to parse JSON
app.use(express.urlencoded({ extended: true }));
app.use(logger); //custom logger middleware
//Routes
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/items", itemsRoutes);

module.exports = app;
