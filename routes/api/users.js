const express = require("express");
const router = express.Router();
const conn = require("../../config/db");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

// @route GET /api/users
// @desc get all users that are doctors
// @access public
router.get("/", (req, res) => {
  conn.query(
    "SELECT e.id as employee_id, e.last_name, e.first_name, e.father_name, " +
      "e.street, e.house, e.flat, e.phone_number, e.image, e.about, " +
      "d.name AS department_name, c.name AS clinic_name, " +
      "j.name AS job_name FROM employees e INNER JOIN departments d ON " +
      "e.department_id = d.id INNER JOIN clinics c ON d.clinic_id = c.id " +
      "INNER JOIN jobs j ON e.job_id = j.id",
    (err, results, fields) => {
      if (err) res.status(400).json(err);
      res.json(results);
    }
  );
});

// @route POST /api/users
// @desc register new user
// @access public
router.post("/", (req, res) => {
  const data = req.body;

  if ({ ...data }) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const email = data.email;

  conn.query("SELECT email from users", (err, results, fields) => {
    if (err) res.status(400).json(err);
    if (results.includes(email)) {
      return res.status(400).json({ msg: "User already exists" });
    } else {
      conn.query(
        "INSERT employees(city_id, job_id, department_id, " +
          "about, last_name, first_name, father_name, street, house, flat, " +
          "phone_number, image) VALUES " +
          `(${data.city}, ${data.job}, ` +
          `${data.department}, ${data.about}, ${data.lastName}, ${data.firstName}, ` +
          `${data.fatherName}, ${data.street}, ${data.house}, ${data.flat}, ` +
          `${data.phoneNumber}, ${data.image});`,
        (err, results, fields) => {
          if (err) res.status(400).json(err);
          const employee_id = results.id;
          bcrypt.getSalt(10, (err, salt) => {
            bcrypt.hash(data.password, salt, (err, hash) => {
              if (err) throw err;
              conn.query(
                "INSERT users(employee_id, login, email, password) " +
                  "VALUES " +
                  `(${employee_id}, ${data.login}, ${data.email}), ` +
                  `${hash});`,
                (err, results, fields) => {
                  if (err) res.status(400).json(err);
                  jwt.sign(
                    { id: results.id },
                    config.get("jwtSecret"),
                    { expiresIn: 36000 },
                    (err, token) => {
                      if (err) throw err;
                      res.json({
                        token,
                        user: {
                          id: results.id,
                          login: results.login,
                          email: results.email,
                        },
                      });
                    }
                  );
                }
              );
            });
          });
        }
      );
    }
  });
});

module.exports = router;
