const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/symptomstat
router.get("/", (req, res) => {
  const { id } = req.query;
  conn.query("SELECT id FROM symptoms;", (err, results, fields) => {
    if (err) return res.status(400).json(err);
    let queries = "";
    for (const result of results) {
      queries +=
        "SELECT s.id, s.name, COUNT(s.id) AS count FROM symptoms s " +
        "INNER JOIN presence_symptom ps ON ps.symptom_id = s.id " +
        "INNER JOIN presences pr ON ps.presence_id = pr.id " +
        `WHERE pr.doctor_id = ${id} AND ps.symptom_id = ${result.id}; `;
    }
    const isMult = results.length > 1;
    conn.query(queries, (err, results, fields) => {
      if (err) return res.status(400).json(err);
      let response = [];
      if (isMult) {
        for (const result of results) {
          response.push(...result);
        }
      } else {
        for (const result of results) {
          response.push(result);
        }
      }
      return res.json(response);
    });
  });
});

module.exports = router;
