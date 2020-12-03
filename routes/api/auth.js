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

  conn.query("SELECT email, password from users", (err, results, fields) => {
    if (err) return res.json(err);
    if (!results) return res.status(400).json({ msg: "User does not exists" });
    bcrypt.compare(password, results.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
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
    });
  });
});

// @route GET /api/auth/user
// @desc Get user data
// @access private
router.get("/user", auth, (req, res) => {
  conn.query(
    `SELECT password FROM users WHERE users.id=${req.user.id}`,
    (err, results, fields) => {
      if (err) res.json(err);
      res.json(results);
    }
  );
});

// @route GET /api/auth/register
// @desc Get register form data
// @access public
router.get("/register", (req, res) => {
  conn.query("SELECT email from users", (err, results, fields) => {
    if (err) res.status(400).json(err);
    console.log(results);
    res.json(results);
  });
});

module.exports = router;
