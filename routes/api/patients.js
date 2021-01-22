const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/patients
router.get("/", (req, res) => {
  const { id, search, category } = req.query;
  let findStr = "";
  if (search) {
    findStr = `AND ${category} LIKE "%${search}%"`;
  }

  conn.query(
    "SELECT p.last_name AS lastName, " +
      "p.first_name AS firstName, p.father_name AS fatherName, " +
      "p.id FROM patients p " +
      `WHERE p.doctor_id = ${id} ${findStr} ` +
      "ORDER BY p.updated_at;",
    (err, results, fields) => {
      if (err) res.status(400).json(err);
      res.json(results);
    }
  );
});

// @route PUT /api/patients/id
router.put("/:id", (req, res) => {
  const data = req.body;
  if (!{ ...data }) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  conn.query(
    `UPDATE patients SET city_id = ${data.city}, doctor_id = ${data.doctor}, ` +
      `last_name = "${data.lastName}", first_name = "${data.firstName}", ` +
      `father_name = "${data.fatherName}", street = "${data.street}", ` +
      `house = "${data.house}", flat = "${data.flat}", ` +
      `phone_number = "${data.phoneNumber}" WHERE id = ${data.id};`,
    (err, results, fields) => {
      if (err) return res.status(400).json(err);
      return res.json([
        {
          patient: { ...data },
        },
      ]);
    }
  );
});

// @route GET /api/patients/id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  const patient =
    "SELECT p.first_name AS firstName, p.last_name AS lastName, " +
    "p.father_name AS fatherName, p.phone_number AS phoneNumber, " +
    "p.street, p.house, p.flat, p.doctor_id AS doctor, c.name AS city, " +
    "p.id, c.id AS cityId " +
    "FROM patients p INNER JOIN cities c ON c.id = p.city_id " +
    `WHERE p.id = ${id}; `;

  const symptoms =
    "SELECT s.id, s.name, ps.description, " +
    "ps.date_plan as datePlan, ps.date_fact AS dateFact " +
    "FROM symptoms s " +
    "INNER JOIN presence_symptom ps ON ps.symptom_id = s.id " +
    "INNER JOIN presences p ON p.id = ps.presence_id " +
    `WHERE p.patient_id = ${id};`;

  const diagnosis =
    "SELECT d.id, d.name, pd.description, pd.date_plan AS datePlan, " +
    "pd.date_fact AS dateFact FROM diseases d " +
    "INNER JOIN presence_disease pd ON pd.disease_id = d.id " +
    "INNER JOIN presences p ON p.id = pd.presence_id " +
    `WHERE p.patient_id = ${id}; `;

  const medicaments =
    "SELECT m.id, m.name, pm.description, pm.date_plan AS datePlan, " +
    "pm.date_fact as dateFact " +
    "FROM medicaments m " +
    "INNER JOIN presence_medicament pm ON pm.medicament_id = m.id " +
    "INNER JOIN presences p ON p.id = pm.presence_id " +
    `WHERE p.patient_id = ${id}; `;

  const procedures =
    "SELECT p.id, p.name, pp.description, " +
    "pp.date_plan AS datePlan, pp.date_fact AS dateFact FROM procedures p " +
    "INNER JOIN presence_procedure pp ON pp.procedure_id = p.id " +
    "INNER JOIN presences pa ON pa.id = pp.presence_id " +
    `WHERE pa.patient_id = ${id}; `;

  const treatments =
    "SELECT t.id, t.name, pt.description, " +
    "pt.date_plan AS datePlan, pt.date_fact AS dateFact FROM treatments t " +
    "INNER JOIN presence_treatment pt ON pt.treatment_id = t.id " +
    "INNER JOIN presences p ON p.id = pt.presence_id " +
    `WHERE p.patient_id = ${id}; `;

  conn.query(
    `${patient} ${symptoms} ${diagnosis} ${medicaments} ${procedures} ${treatments}`,
    (err, results, fields) => {
      if (err) return res.status(400).json(err);
      return res.json([
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
router.post("/", (req, res) => {
  const data = req.body;
  if (!{ ...data }) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  conn.query(
    "INSERT INTO patients(city_id, doctor_id, " +
      "last_name, first_name, father_name, street, " +
      "house, flat, phone_number) VALUES " +
      `(${data.city}, ${data.doctor}, "${data.lastName}", ` +
      `"${data.firstName}", "${data.fatherName}", "${data.street}", ` +
      `"${data.house}", "${data.flat}", "${data.phoneNumber}");`,
    (err, results, fields) => {
      if (err) return res.status(400).json(err);
      return res.json([
        {
          patient: { ...data, id: results.insertId },
        },
      ]);
    }
  );
});

module.exports = router;
