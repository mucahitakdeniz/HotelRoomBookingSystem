const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;
const HOST = process.env.PORT || "127.0.0.1";

// Error Handler for async Errors
require("express-async-errors");

//Db Connection
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

// Accept JSON:
app.use(express.json());

//Cors
app.use(require("cors")());


// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

app.get("/", (req, res) => {
  res.send("Welcome to  Hotel Room Booking System");
});

app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`));
