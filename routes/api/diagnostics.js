const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/diagnostics
router.get("/", (req, res) => {
  const { symptoms } = req.query;
  const unknownSymptomsQuery = "SELECT id, name FROM symptoms;";
  const diagnosisQuery = "SELECT ";
  conn.query(unknownSymptomsQuery, (err, results, fields) => {
    if (err) return res.status(400).json(err);
    const ids = results.map((r) => r.id);
    const unknownSymptoms = symptoms.filter((s) => !ids.contains(s.id));
    conn.query();
  });
});

module.exports = router;
