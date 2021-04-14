const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/symptoms
router.get("/", (req, res) => {
  conn.query("SELECT id, name FROM symptoms", (err, results, fields) => {
    if (err) return res.status(400).json(err);
    return res.json(results);
  });
});

// @route POST /api/symptoms
router.post("/", (req, res) => {
  const data = req.body;
  if (!{ ...req.body }) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  const insertQuery = `INSERT INTO symptoms(name) VALUES("${data.name}");`;
  conn.query(insertQuery, (err, results, fields) => {
    if (err) return res.status(400).json(err);
    return res.json({ ...data, id: results.insertId });
  });
});

module.exports = router;
