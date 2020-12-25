const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/countries
router.get("/", (req, res) => {
  conn.query("SELECT * FROM countries", (err, results, fields) => {
    if (err) return res.status(400).json(err);
    return res.json(results);
  });
});

module.exports = router;
