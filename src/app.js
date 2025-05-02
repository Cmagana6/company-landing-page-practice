const express = require("express");
const contentRoutes = require("./routes/contentRoutes");

const app = express();

app.use(express.json()); //Middleware to parse JSON

//Routes
app.use("/api/v1/content", contentRoutes);

module.exports = app;
