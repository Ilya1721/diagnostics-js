const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/treatmentstat
router.get("/", (req, res) => {
  const { id } = req.query;
  conn.query("SELECT id FROM treatments;", (err, results, fields) => {
    if (err) return res.status(400).json(err);
    let queries = "";
    for (const result of results) {
      queries +=
        "SELECT t.id, t.name, COUNT(t.id) AS count FROM treatments t " +
        "INNER JOIN presence_treatment pt ON pt.treatment_id = t.id " +
        "INNER JOIN presences pr ON pt.presence_id = pr.id " +
        `WHERE pr.doctor_id = ${id} AND pt.treatment_id = ${result.id}; `;
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
