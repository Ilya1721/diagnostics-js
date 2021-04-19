const express = require("express");
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
const jobs = require("./routes/api/jobs");
const departments = require("./routes/api/departments");
const aws = require("./routes/api/aws");
const visits = require("./routes/api/visits");
const rooms = require("./routes/api/rooms");
const patients = require("./routes/api/patients");
const procedurestat = require("./routes/api/procedurestat");
const treatmentstat = require("./routes/api/treatmentstat");
const medicamentstat = require("./routes/api/medicamentstat");
const diagnosstat = require("./routes/api/diagnosstat");
const symptomstat = require("./routes/api/symptomstat");
const symptoms = require("./routes/api/symptoms");
const medicaments = require("./routes/api/medicaments");
const treatments = require("./routes/api/treatments");
const procedures = require("./routes/api/procedures");
const diagnosis = require("./routes/api/diagnosis");
const visitstat = require("./routes/api/visitstat");
const diagnostics = require("./routes/api/diagnostics");

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
app.use("/api/jobs", jobs);
app.use("/api/symptoms", symptoms);
app.use("/api/medicaments", medicaments);
app.use("/api/procedures", procedures);
app.use("/api/treatments", treatments);
app.use("/api/diagnosis", diagnosis);
app.use("/api/departments", departments);
app.use("/api/aws", aws);
app.use("/api/visits", visits);
app.use("/api/rooms", rooms);
app.use("/api/patients", patients);
app.use("/api/procedurestat", procedurestat);
app.use("/api/treatmentstat", treatmentstat);
app.use("/api/medicamentstat", medicamentstat);
app.use("/api/diagnosstat", diagnosstat);
app.use("/api/symptomstat", symptomstat);
app.use("/api/visitstat", visitstat);
app.use("/api/diagnostics", diagnostics);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
