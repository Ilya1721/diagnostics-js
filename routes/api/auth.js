const express = require("express");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;
const { enterAllFieldsMsg, userExistsMsg } = require("../../strings");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const User = require("../../models/User");

// @route POST /api/auth
// @desc Auth user
// @access public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  User.findOne({
    email,
  }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

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

// @route GET /api/auth/user
// @desc Get user data
// @access private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

// @route GET /api/auth/register
// @desc Get register form data
// @access public
router.get("/register", (req, res) => {
  conn.query(
    "SELECT c.name AS city_name, c.id AS city_id, co.name AS country_name, " +
      "co.id AS country_id, cl.name AS clinic_name, cl.id AS clinic_id " +
      "FROM cities c, countries co, clinics cl",
    (err, results, fields) => {
      if (err) res.status(400).json(err);
      res.json(results);
    }
  );
});

module.exports = router;
