const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/diagnosstat
router.get("/", (req, res) => {
  const { id } = req.query;
  const diagnosQuery =
    "SELECT d.id, d.name, COUNT(*) AS count " +
    "FROM diseases d INNER JOIN presence_disease pd ON pd.disease_id = d.id " +
    "INNER JOIN presences pr ON pd.presence_id = pr.id " +
    `WHERE pr.doctor_id = ${id} GROUP BY(d.name)`;
  conn.query(diagnosQuery, (err, results, fields) => {
    if (err) return res.status(400).json(err);
    return res.json(results);
  });
});

module.exports = router;
