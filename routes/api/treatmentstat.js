const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/treatmentstat
router.get("/", (req, res) => {
  const { id } = req.query;
  const treatmentQuery =
    "SELECT t.id, t.name, COUNT(*) AS count " +
    "FROM treatments t INNER JOIN presence_treatment pt " +
    "ON pt.treatment_id = t.id INNER JOIN presences pr " +
    "ON pt.presence_id = pr.id " +
    `WHERE pr.doctor_id = ${id} GROUP BY(t.name)`;
  conn.query(treatmentQuery, (err, results, fields) => {
    if (err) return res.status(400).json(err);
    return res.json(results);
  });
});

module.exports = router;
