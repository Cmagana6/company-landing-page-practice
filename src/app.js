const express = require("express");
const contentRoutes = require("./routes/contentRoutes");

const app = express();

app.use(express.json());

//Routes
app.use("/api/content", contentRoutes);

module.exports = app;
