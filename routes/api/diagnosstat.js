const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/diagnosstat
router.get("/", (req, res) => {
  const { id } = req.query;
  conn.query("SELECT id FROM diseases;", (err, results, fields) => {
    if (err) return res.status(400).json(err);
    let queries = "";
    for (const result of results) {
      queries +=
        "SELECT d.id, d.name, COUNT(d.id) AS count FROM diseases d " +
        "INNER JOIN presence_disease pd ON pd.disease_id = d.id " +
        "INNER JOIN presences pr ON pd.presence_id = pr.id " +
        `WHERE pr.doctor_id = ${id} AND pd.disease_id = ${result.id}; `;
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
