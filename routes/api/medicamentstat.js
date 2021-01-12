const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/medicamentstat
router.get("/", (req, res) => {
  const { id } = req.query;
  conn.query("SELECT id FROM medicaments;", (err, results, fields) => {
    if (err) return res.status(400).json(err);
    let queries = "";
    for (const result of results) {
      queries +=
        "SELECT m.id, m.name, COUNT(m.id) AS count FROM medicaments m " +
        "INNER JOIN presence_medicament pm ON pm.medicament_id = m.id " +
        "INNER JOIN presences pr ON pm.presence_id = pr.id " +
        `WHERE pr.doctor_id = ${id} AND pm.medicament_id = ${result.id}; `;
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
