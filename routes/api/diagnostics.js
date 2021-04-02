const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route POST /api/diagnostics
router.post("/generate", (req, res) => {
  const symptoms = req.body;
  const diagnosisQuery = "SELECT id, name FROM diseases";
  conn.query(diagnosisQuery, (err, results, fields) => {
    if (err) return res.status(400).json(err);
    return res.json({ diagnosis: results });
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

// @route post /api/diagnostics
router.post("/", (req, res) => {
  const data = req.body;
  if (!{ ...data }) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  const { diagnos, symptoms } = data;
  const diagnosQuery = `SELECT id, name FROM diseases WHERE name = "${diagnos.name}";`;
  conn.query(diagnosQuery, (err, results, fields) => {
    if (err) return res.status(400).json(err);
    const diagnosId = results[0].id;
    const insertDiagnostics = new Promise(async (resolve, reject) => {
      try {
        for (const symptom of symptoms) {
          const symptomQuery =
            "SELECT id, name FROM symptoms " + `WHERE name = "${symptom.name}"`;
          const symptomIds = await conn.promise().query(symptomQuery);
          const symptomId = symptomIds[0].id;
          const insertQuery =
            "INSERT INTO symptom_disease(symptom_id, disease_id) " +
            `VALUES(${diagnosId}, ${symptomId});`;
          const insertId = await conn.promise().query(insertQuery);
        }
        const feedback = { success: true };
        resolve(feedback);
      } catch (err) {
        reject(err);
      }
    })
      .then((feedback) => {
        return res.json(feedback);
      })
      .catch((err) => {
        return res.json(err);
      });
  });
});

module.exports = router;
