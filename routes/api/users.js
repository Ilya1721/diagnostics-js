const express = require("express");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;
const { enterAllFieldsMsg, userExistsMsg } = require("../../strings");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

// @route GET /api/users
// @desc get all users that are doctors
// @access public
router.get("/", (req, res) => {
  //Fix find with query params from request
  User.find({
    job: ObjectId("5f8d9c1d26cef4e6e292545a"),
  })
    .populate("city")
    .populate("job")
    .populate("department")
    .populate("clinic")
    .then((employees) => res.json(employees))
    .catch((err) => console.log(err));
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
