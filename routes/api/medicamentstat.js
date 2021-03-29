const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/medicamentstat
router.get("/", (req, res) => {
  const { id } = req.query;
  const medicamentQuery =
    "SELECT m.id, m.name, COUNT(*) AS count " +
    "FROM medicaments m INNER JOIN presence_medicament pm " +
    "ON pm.medicament_id = m.id INNER JOIN presences pr " +
    "ON pm.presence_id = pr.id " +
    `WHERE pr.doctor_id = ${id} GROUP BY(m.name)`;
  conn.query(medicamentQuery, (err, results, fields) => {
    if (err) return res.status(400).json(err);
    return res.json(results);
  });
});

module.exports = router;
