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
    let symptomArr = [];
    const insertDiagnostics = new Promise(async (resolve, reject) => {
      try {
        for (const symptom of symptoms) {
          const symptomQuery =
            "SELECT id, name FROM symptoms " +
            `WHERE name = "${symptom.name}";`;
          const symptomIds = await conn.promise().query(symptomQuery);
          const symptomId = symptomIds[0][0].id;
          const insertQuery =
            "INSERT INTO symptom_disease(symptom_id, disease_id) " +
            `VALUES(${symptomId}, ${diagnosId});`;
          const insertId = await conn.promise().query(insertQuery);
          symptomArr.push({ ...symptom, id: symptomId });
        }
        const diagnostic = {
          diagnos: { ...diagnos, id: diagnosId },
          symptoms: symptomArr,
        };
        resolve(diagnostic);
      } catch (err) {
        reject(err);
      }
    })
      .then((diagnostic) => {
        return res.json(diagnostic);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  });
});

// @route GET /api/diagnostics/id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const diagnosQuery =
    "SELECT DISTINCT d.id, d.name FROM diseases d " +
    "INNER JOIN symptom_disease sd " +
    `ON sd.disease_id = d.id WHERE d.id = ${id};`;
  const symptomsQuery =
    "SELECT s.id, s.name FROM symptoms s " +
    "INNER JOIN symptom_disease sd " +
    `ON sd.symptom_id = s.id WHERE sd.disease_id = ${id};`;
  conn.query(diagnosQuery, (err, results, fields) => {
    if (err) return res.status(400).json(err);
    const diagnos = results[0];
    conn.query(symptomsQuery, (err, results, fields) => {
      if (err) return res.status(400).json(err);
      const symptoms = results;
      return res.json({ diagnos, symptoms });
    });
  });
});

// @route PUT /api/diagnostics/id
router.put("/:id", (req, res) => {
  const { diagnos, symptoms, newSymptoms, deletedSymptoms } = req.body;
  const id = req.params.id;
  if (!{ ...req.body }) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  const updateSymptoms = new Promise(async (resolve, reject) => {
    try {
      let symptomArr = [];
      console.log("symptoms", symptoms);
      for (const symptom of symptoms) {
        const symptomQuery =
          "SELECT s.id, s.name FROM symptoms s " +
          `WHERE s.name = "${symptom.name}";`;
        const symptomIds = await conn.promise().query(symptomQuery);
        const symptomId = symptomIds[0][0].id;
        console.log("symptomId", symptomId);
        const oldSymptomQuery =
          "SELECT s.id, s.name FROM symptoms s " +
          `WHERE s.name = "${symptom.startName}";`;
        const oldSymptomIds = await conn.promise().query(oldSymptomQuery);
        const oldSymptomId = oldSymptomIds[0][0].id;
        console.log("oldSymptomId", oldSymptomId);
        const rowIdQuery =
          "SELECT sd.id FROM symptom_disease sd " +
          `WHERE sd.symptom_id = ${oldSymptomId} AND sd.disease_id = ${id};`;
        const rowIds = await conn.promise().query(rowIdQuery);
        const rowId = rowIds[0][0].id;
        console.log("rowId", rowId);
        const updateQuery =
          "UPDATE symptom_disease SET " +
          `symptom_id = ${symptomId} WHERE id = ${rowId};`;
        const results = await conn.promise().query(updateQuery);
        console.log("symptomId", symptomId);
        symptomArr.push({ ...symptom, id: symptomId });
      }
      console.log("newSymptoms", newSymptoms);
      for (const symptom of newSymptoms) {
        const symptomQuery =
          "SELECT id, name FROM symptoms " + `WHERE name = "${symptom.name}";`;
        const symptomIds = await conn.promise().query(symptomQuery);
        const symptomId = symptomIds[0][0].id;
        const insertQuery =
          "INSERT INTO symptom_disease(symptom_id, disease_id) " +
          `VALUES(${symptomId}, ${id});`;
        const insertId = await conn.promise().query(insertQuery);
        symptomArr.push({ ...symptom, id: symptomId });
      }
      console.log("deletedSymptoms", deletedSymptoms);
      for (const symptom of deletedSymptoms) {
        const symptomQuery =
          "SELECT id, name FROM symptoms " + `WHERE name = "${symptom.name}";`;
        const symptomIds = await conn.promise().query(symptomQuery);
        const symptomId = symptomIds[0][0].id;
        const deleteIdQuery =
          "SELECT sd.id FROM symptom_disease sd " +
          `WHERE sd.symptom_id = ${symptomId} AND sd.disease_id = ${id};`;
        const deleteIds = await conn.promise().query(deleteIdQuery);
        const deleteId = deleteIds[0][0].id;
        console.log("deletedId", deleteId);
        const deleteQuery = `DELETE FROM symptom_disease WHERE id = ${deleteId};`;
        const result = await conn.promise().query(deleteQuery);
      }
      const diagnostic = {
        diagnos,
        symptoms: symptomArr,
      };
      console.log(diagnostic);
      resolve(diagnostic);
    } catch (err) {
      reject(err);
    }
  })
    .then((diagnostic) => {
      return res.json([diagnostic]);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

module.exports = router;
