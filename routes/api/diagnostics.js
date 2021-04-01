const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route POST /api/diagnostics
router.post("/", (req, res) => {
  const symptoms = req.body;
  const unknownSymptomsQuery = "SELECT id, name FROM symptoms;";
  const diagnosisQuery = "SELECT id, name FROM diseases";
  conn.query(unknownSymptomsQuery, (err, results, fields) => {
    if (err) return res.status(400).json(err);
    const names = results.map((r) => r.name);
    const unknownSymptoms = symptoms.filter((s) => !names.includes(s.name));
    conn.query(diagnosisQuery, (err, results, fields) => {
      if (err) return res.status(400).json(err);
      return res.json({ diagnosis: results, unknownSymptoms });
    });
  });
});

// @route GET /api/diagnostics
router.get("/", (req, res) => {
  const diagnosQuery =
    "SELECT DISTINCT d.id, d.name FROM diseases d " +
    "INNER JOIN symptom_disease sd ON d.id = sd.disease_id;";
  conn.query(diagnosQuery, (err, results, fields) => {
    if (err) return res.status(400).json(err);
    let diagnostics = [];
    const getSymptoms = new Promise(async (resolve, reject) => {
      for (const result of results) {
        const symptomsQuery =
          "SELECT DISTINCT s.id, s.name FROM symptoms s " +
          "INNER JOIN symptom_disease sd " +
          `ON s.id = sd.symptom_id WHERE sd.disease_id = ${result.id};`;
        const symptoms = await conn.promise().query(symptomsQuery);
        diagnostics.push({
          diagnos: result,
          symptoms: symptoms[0],
        });
      }
      resolve(diagnostics);
    }).then((diagnostics) => {
      return res.json(diagnostics);
    });
  });
});

module.exports = router;
