const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const conn = require("./config/db");

//Load config
dotenv.config({
  path: "./config/config.env",
});

try {
  conn.connect((err) => {
    if (err) throw err;
    console.log(`MySQL connected: ${conn.config.host}`);
  });
} catch (err) {
  console.log(err);
}

//Require api
const clinics = require("./routes/api/clinics");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const cities = require("./routes/api/cities");
const countries = require("./routes/api/countries");

//Initialize app
const app = express();
//Body Parser Middleware
app.use(express.json());
//Routes
app.use("/api/clinics", clinics);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/cities", cities);
app.use("/api/countries", countries);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
