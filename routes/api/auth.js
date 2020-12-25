const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const conn = require("../../config/db");

// @route POST /api/auth
// @desc Auth user
// @access public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  conn.query(
    "SELECT * FROM users WHERE " + `users.email = \"${email}\";`,
    (err, results, fields) => {
      if (err) return res.json(err);
      if (results === undefined)
        return res.status(400).json({ msg: "User does not exists" });
      const result = results[0];
      bcrypt
        .compare(password, result.password)
        .then((isMatch) => {
          if (!isMatch)
            return res.status(400).json({ msg: "Invalid credentials" });
          jwt.sign(
            { id: result.id },
            config.get("jwtSecret"),
            { expiresIn: 36000 },
            (err, token) => {
              if (err) throw err;
              return res.json({
                token,
                user: {
                  id: result.id,
                  login: result.login,
                  email: result.email,
                },
              });
            }
          );
        })
        .catch((err) => res.status(400).json({ msg: "Password error" }));
    }
  );
});

// @route GET /api/auth/user
// @desc Get user data
// @access private
router.get("/user", auth, (req, res) => {
  conn.query(
    "SELECT u.login, u.email, u.id, c.name as city, co.name as country, " +
      "d.name as department, e.about, e.last_name as lastName, " +
      "e.first_name as firstName, e.father_name as fatherName, " +
      "e.street, e.flat, e.house, e.image as image, " +
      "e.phone_number as phoneNumber, j.name as job " +
      "FROM users u INNER JOIN employees e ON u.employee_id = e.id " +
      "INNER JOIN cities c ON e.city_id = c.id " +
      "INNER JOIN countries co ON c.country_id = co.id " +
      "INNER JOIN departments d ON e.department_id = d.id " +
      "INNER JOIN jobs j on e.job_id = j.id " +
      `WHERE u.id = ${req.user.id};`,
    (err, results, fields) => {
      if (err) return res.json(err);
      return res.json(results[0]);
    }
  );
});

// @route GET /api/auth/register
// @desc Get register form data
// @access public
router.get("/register", (req, res) => {
  conn.query("SELECT email FROM users", (err, results, fields) => {
    if (err) return res.status(400).json(err);
    return res.json(results);
  });
});

module.exports = router;
