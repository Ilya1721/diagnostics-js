const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/diagnosis
router.get("/", (req, res) => {
  conn.query("SELECT id, name FROM diseases", (err, results, fields) => {
    if (err) return res.status(400).json(err);
    return res.json(results);
  });
});

module.exports = router;
