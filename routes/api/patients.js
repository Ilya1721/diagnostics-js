const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/patients
router.get("/", (req, res) => {
  const { id, find } = req.query;
  let findStr = "";
  if (find !== undefined) {
    findStr = `AND ${find} = dede;`;
  }

  conn.query(
    "SELECT p.last_name AS lastName, " +
      "p.first_name AS firstName, p.father_name AS fatherName, " +
      "p.id FROM patients p INNER JOIN users u " +
      `ON p.doctor_id = u.employee_id WHERE u.id = ${id} ${findStr} ` +
      "ORDER BY p.updated_at;",
    (err, results, fields) => {
      if (err) res.status(400).json(err);
      res.json(results);
    }
  );
});

// @route GET /api/patients/id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  const patient =
    "SELECT p.first_name AS firstName, p.last_name AS lastName, " +
    "p.father_name AS fatherName, p.phone_number AS phoneNumber, " +
    "p.street, p.house, p.flat, c.name AS city, p.id " +
    "FROM patients p INNER JOIN cities c ON c.id = p.city_id " +
    `WHERE p.id = ${id}; `;

  const symptoms =
    "SELECT s.id, s.name, s.description, ps.amount, " +
    "ps.date_plan as datePlan, ps.date_fact AS dateFact, " +
    "s.unit_of_measure AS unitOfMeasure FROM symptoms s " +
    "INNER JOIN presence_symptom ps ON ps.symptom_id = s.id " +
    "INNER JOIN presences p ON p.id = ps.presence_id " +
    `WHERE p.patient_id = ${id};`;

  const diagnosis =
    "SELECT d.id, d.name, d.description, pd.date_plan AS datePlan, " +
    "pd.date_fact AS dateFact FROM diseases d " +
    "INNER JOIN presence_disease pd ON pd.disease_id = d.id " +
    "INNER JOIN presences p ON p.id = pd.presence_id " +
    `WHERE p.patient_id = ${id}; `;

  const medicaments =
    "SELECT m.id, m.name, pm.amount, pm.date_plan AS datePlan, " +
    "pm.date_fact as dateFact, " +
    "m.unit_of_measure AS unitOfMeasure FROM medicaments m " +
    "INNER JOIN presence_medicament pm ON pm.medicament_id = m.id " +
    "INNER JOIN presences p ON p.id = pm.presence_id " +
    `WHERE p.patient_id = ${id}; `;

  const procedures =
    "SELECT p.id, p.name, pp.amount, p.description, " +
    "p.unit_of_measure AS unitOfMeasure, " +
    "pp.date_plan AS datePlan, pp.date_fact AS dateFact FROM procedures p " +
    "INNER JOIN presence_procedure pp ON pp.procedure_id = p.id " +
    "INNER JOIN presences pa ON pa.id = pp.presence_id " +
    `WHERE pa.patient_id = ${id}; `;

  const treatments =
    "SELECT t.id, t.name, t.description, " +
    "pt.date_plan AS datePlan, pt.date_fact AS dateFact FROM treatments t " +
    "INNER JOIN presence_treatment pt ON pt.treatment_id = t.id " +
    "INNER JOIN presences p ON p.id = pt.presence_id " +
    `WHERE p.patient_id = ${id}; `;

  conn.query(
    `${patient} ${symptoms} ${diagnosis} ${medicaments} ${procedures} ${treatments}`,
    (err, results, fields) => {
      if (err) throw err;
      console.log([
        {
          patient: results[0][0],
          symptoms: results[1],
          diagnosis: results[2],
          medicaments: results[3],
          procedures: results[4],
          treatments: results[5],
        },
      ]);
      res.json([
        {
          patient: results[0][0],
          symptoms: results[1],
          diagnosis: results[2],
          medicaments: results[3],
          procedures: results[4],
          treatments: results[5],
        },
      ]);
    }
  );
});

// @route POST /api/patients

module.exports = router;
