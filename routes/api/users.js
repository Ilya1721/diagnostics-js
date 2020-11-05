const express = require("express");
const router = express.Router();
const conn = require("../../config/db");
const { enterAllFieldsMsg, userExistsMsg } = require("../../strings");
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

  User.findOne({
    email,
  }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      ...data,
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 36000 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  login: user.login,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
