const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/procedurestat
router.get("/", (req, res) => {
  const { id } = req.query;
  conn.query("SELECT id FROM procedures;", (err, results, fields) => {
    if (err) return res.status(400).json(err);
    let queries = "";
    for (const result of results) {
      queries +=
        "SELECT p.id, p.name, COUNT(p.id) AS count FROM procedures p " +
        "INNER JOIN presence_procedure pp ON pp.procedure_id = p.id " +
        "INNER JOIN presences pr ON pp.presence_id = pr.id " +
        `WHERE pr.doctor_id = ${id} AND pp.procedure_id = ${result.id}; `;
    }
    console.log(queries);
    conn.query(queries, (err, results, fields) => {
      if (err) return res.status(400).json(err);
      let response = [];
      for (const result of results) {
        response.push(...result);
      }
      return res.json(response);
    });
  });
});

module.exports = router;
