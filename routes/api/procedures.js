const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/procedures
router.get("/", (req, res) => {
  conn.query("SELECT id, name FROM procedures", (err, results, fields) => {
    if (err) return res.status(400).json(err);
    return res.json(results);
  });
});

// @route POST /api/procedures
router.post("/", (req, res) => {
  const data = req.body;
  if (!{ ...req.body }) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  const insertQuery = `INSERT INTO procedures(name) VALUES("${data.name}");`;
  conn.query(insertQuery, (err, results, fields) => {
    if (err) return res.status(400).json(err);
    return res.json({ ...data, id: results.insertId });
  });
});

module.exports = router;
