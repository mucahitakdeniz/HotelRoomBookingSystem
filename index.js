const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;
const HOST = process.env.PORT || "127.0.0.1";

// Error Handler for async Errors
require("express-async-errors");

//Db Connection
require("./src/configs/dbConnection")();

// Accept JSON:
app.use(express.json());

//Cors
app.use(require("cors")());

//Authentication:
app.use(require('./src/middlewares/authentication'))

// Routes:
app.use(require('./src/routes'))

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

app.get("/", (req, res) => {
  res.send("Welcome to  Hotel Room Booking System");
});

// RUN SERVER:
app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`));
