const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/departments
router.get("/", (req, res) => {
  conn.query("SELECT * FROM departments", (err, results, fields) => {
    if (err) res.status(400).json(err);
    res.json(results);
  });
});

module.exports = router;
