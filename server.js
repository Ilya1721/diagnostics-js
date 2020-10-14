const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//Load config
dotenv.config({
  path: "./config/config.env",
});

connectDB();

//Require api
const clinics = require("./routes/api/clinics");

//Initialize app
const app = express();
//Body Parser Middleware
app.use(express.json());
//Routes
app.use("/api/clinics", clinics);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
