const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/procedurestat
router.get("/", (req, res) => {
  const { id } = req.query;
  const procedureQuery =
    "SELECT p.id, p.name, COUNT(*) AS count " +
    "FROM procedures p INNER JOIN presence_procedure pp " +
    "ON pp.procedure_id = p.id INNER JOIN presences pr " +
    "ON pp.presence_id = pr.id " +
    `WHERE pr.doctor_id = ${id} GROUP BY(p.name)`;
  conn.query(procedureQuery, (err, results, fields) => {
    if (err) return res.status(400).json(err);
    return res.json(results);
  });
});

module.exports = router;
