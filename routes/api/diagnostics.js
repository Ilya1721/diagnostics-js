const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route POST /api/diagnostics
router.post("/generate", (req, res) => {
  const symptoms = req.body;
  let symptomsQuery = "";
  for (const symptom of symptoms) {
    symptomsQuery += `SELECT id, name FROM symptoms WHERE name = "${symptom.name}"; `;
  }
  let diagnosisQuery = "";
  conn.query(symptomsQuery, (err, results, fields) => {
    if (err) return res.status(400).json(err);
    for (const symptom of results) {
      const symptomId = Array.isArray(symptom) ? symptom[0].id : symptom.id;
      diagnosisQuery +=
        "SELECT d.id, d.name FROM symptom_disease sd " +
        "INNER JOIN diseases d ON d.id = sd.disease_id " +
        `WHERE symptom_id = ${symptomId}; `;
    }
    conn.query(diagnosisQuery, (err, results, fields) => {
      if (err) return res.status(400).json(err);
      let filteredDiagnosArr;
      if (Array.isArray(results[0])) {
        filteredDiagnosArr = results[0];
        for (const diagnosArr of results) {
          const diagnosIds = diagnosArr.map((d) => d.id);
          filteredDiagnosArr = filteredDiagnosArr.filter((d) =>
            diagnosIds.includes(d.id)
          );
        }
      } else {
        filteredDiagnosArr = results;
      }
      return res.json({ diagnosis: filteredDiagnosArr });
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
      for (const symptom of symptoms) {
        const symptomQuery =
          "SELECT s.id, s.name FROM symptoms s " +
          `WHERE s.name = "${symptom.name}";`;
        const symptomIds = await conn.promise().query(symptomQuery);
        const symptomId = symptomIds[0][0].id;
        const oldSymptomQuery =
          "SELECT s.id, s.name FROM symptoms s " +
          `WHERE s.name = "${symptom.startName}";`;
        const oldSymptomIds = await conn.promise().query(oldSymptomQuery);
        const oldSymptomId = oldSymptomIds[0][0].id;
        const rowIdQuery =
          "SELECT sd.id FROM symptom_disease sd " +
          `WHERE sd.symptom_id = ${oldSymptomId} AND sd.disease_id = ${id};`;
        const rowIds = await conn.promise().query(rowIdQuery);
        const rowId = rowIds[0][0].id;
        const updateQuery =
          "UPDATE symptom_disease SET " +
          `symptom_id = ${symptomId} WHERE id = ${rowId};`;
        const results = await conn.promise().query(updateQuery);
        symptomArr.push({ ...symptom, id: symptomId });
      }
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
        const deleteQuery = `DELETE FROM symptom_disease WHERE id = ${deleteId};`;
        const result = await conn.promise().query(deleteQuery);
      }
      const diagnostic = {
        diagnos,
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

// @route DELETE /api/diagnostics/id
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const rowIdsQuery =
    "SELECT id FROM symptom_disease " + `WHERE disease_id = ${id};`;
  conn.query(rowIdsQuery, (err, results, fields) => {
    if (err) return res.status(400).json(err);
    const deleteDiagnostics = new Promise(async (resolve, reject) => {
      try {
        for (const result of results) {
          const rowId = result.id;
          const deleteQuery = `DELETE FROM symptom_disease WHERE id = ${rowId}`;
          const deletionResult = await conn.promise().query(deleteQuery);
        }
        const feedback = { success: true };
        resolve(feedback);
      } catch (err) {
        reject(err);
      }
    }).then((feedback) => {
      return res.json(feedback);
    });
  });
});

module.exports = router;
