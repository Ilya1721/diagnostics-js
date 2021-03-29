const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/symptomstat
router.get("/", (req, res) => {
  const { id } = req.query;
  const symptomQuery =
    "SELECT s.id, s.name, COUNT(*) AS count " +
    "FROM symptoms s INNER JOIN presence_symptom ps " +
    "ON ps.symptom_id = s.id INNER JOIN presences pr " +
    "ON ps.presence_id = pr.id " +
    `WHERE pr.doctor_id = ${id} GROUP BY(s.name)`;
  conn.query(symptomQuery, (err, results, fields) => {
    if (err) return res.status(400).json(err);
    return res.json(results);
  });
});

module.exports = router;
