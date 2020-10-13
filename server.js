const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const clinics = require("./routes/api/clinics");

const app = express();

//Load config
dotenv.config({
  path: "./config/config.env",
});

connectDB();

//Body Parser Middleware
app.use(express.json());
//Routes
app.use("/api/clinics", clinics);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
