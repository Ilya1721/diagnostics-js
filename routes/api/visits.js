const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/visits
router.get("/", (req, res) => {
  const { search, category, id } = req.query;
  let findStr = "";
  if (search) {
    findStr = `AND ${category} LIKE "%${search}%"`;
  }

  conn.query(
    "SELECT p.id AS patientId, r.id AS roomId, " +
      "cl.id AS clinicId, pr.id AS presenceId FROM patients p " +
      "INNER JOIN presences pr ON pr.patient_id = p.id " +
      "INNER JOIN users u ON u.id = pr.doctor_id " +
      "INNER JOIN employees e ON e.id = u.employee_id " +
      "INNER JOIN rooms r ON e.room_id = r.id " +
      "INNER JOIN departments d ON r.department_id = d.id " +
      "INNER JOIN clinics cl ON d.clinic_id = cl.id " +
      `WHERE pr.doctor_id = ${id} ${findStr} ` +
      "ORDER BY pr.updated_at DESC;",
    (err, results, fields) => {
      if (err) throw err;
      let visits = [];
      const getVisits = new Promise(async (resolve, reject) => {
        for (const result of results) {
          const patient =
            "SELECT p.first_name AS firstName, p.last_name AS lastName, " +
            "p.father_name AS fatherName, p.phone_number AS phoneNumber, " +
            "p.street, p.house, p.flat, c.name AS city, p.id " +
            "FROM patients p INNER JOIN cities c ON c.id = p.city_id " +
            `WHERE p.id = ${result.patientId};`;

          const presence =
            "SELECT p.start_at AS startAt, p.end_at AS endAt, p.id " +
            `FROM presences p WHERE p.id = ${result.presenceId};`;

          const clinic =
            "SELECT cl.name, cl.id FROM clinics cl " +
            `WHERE cl.id = ${result.clinicId};`;

          const room =
            `SELECT r.number, r.id FROM rooms r ` +
            `WHERE r.id = ${result.roomId};`;

          const symptoms =
            "SELECT s.id, s.name, s.description, ps.amount, " +
            "ps.date_plan as datePlan, ps.date_fact AS dateFact, " +
            "s.unit_of_measure AS unitOfMeasure FROM symptoms s " +
            "INNER JOIN presence_symptom ps ON ps.symptom_id = s.id " +
            "INNER JOIN presences p ON p.id = ps.presence_id " +
            `WHERE p.id = ${result.presenceId};`;

          const diagnosis =
            "SELECT d.id, d.name, d.description, pd.date_plan AS datePlan, " +
            "pd.date_fact AS dateFact FROM diseases d " +
            "INNER JOIN presence_disease pd ON pd.disease_id = d.id " +
            "INNER JOIN presences p ON p.id = pd.presence_id " +
            `WHERE p.id = ${result.presenceId}; `;

          const medicaments =
            "SELECT m.id, m.name, pm.amount, pm.date_plan AS datePlan, " +
            "pm.date_fact as dateFact, " +
            "m.unit_of_measure AS unitOfMeasure FROM medicaments m " +
            "INNER JOIN presence_medicament pm ON pm.medicament_id = m.id " +
            "INNER JOIN presences p ON p.id = pm.presence_id " +
            `WHERE p.id = ${result.presenceId}; `;

          const procedures =
            "SELECT p.id, p.name, pp.amount, p.description, " +
            "p.unit_of_measure AS unitOfMeasure, " +
            "pp.date_plan AS datePlan, pp.date_fact AS dateFact FROM procedures p " +
            "INNER JOIN presence_procedure pp ON pp.procedure_id = p.id " +
            "INNER JOIN presences pa ON pa.id = pp.presence_id " +
            `WHERE pa.id = ${result.presenceId}; `;

          const treatments =
            "SELECT t.id, t.name, t.description, " +
            "pt.date_plan AS datePlan, pt.date_fact AS dateFact FROM treatments t " +
            "INNER JOIN presence_treatment pt ON pt.treatment_id = t.id " +
            "INNER JOIN presences p ON p.id = pt.presence_id " +
            `WHERE p.id = ${result.presenceId}; `;

          const results = await conn
            .promise()
            .query(
              `${patient} ${presence} ${clinic} ${room} ${symptoms} ${diagnosis} ${medicaments} ${procedures} ${treatments}`
            );
          visits.push({
            patient: results[0][0][0],
            presence: results[0][1][0],
            clinic: results[0][2][0],
            room: results[0][3][0],
            symptoms: results[0][4],
            diagnosis: results[0][5],
            medicaments: results[0][6],
            procedures: results[0][7],
            treatments: results[0][8],
          });
        }
        resolve(visits);
      }).then((visits) => {
        return res.json(visits);
      });
    }
  );
});

// @route POST /api/visits

module.exports = router;
