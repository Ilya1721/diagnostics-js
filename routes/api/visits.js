const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/visits
router.get("/", (req, res) => {
  const { id, find } = req.query;
  if (find === undefined) {
    conn.query(
      `SELECT p.id, p.arrived_at, p.departure_at,
        pa.last_name AS lastName, pa.first_name AS firstName,
        pa.father_name AS fatherName, c.name AS city,
        pa.street, pa.flat, pa.house, pa.phone_number AS phoneNumber,
        r.number AS room, cl.name as clinicName
        FROM presences p
        INNER JOIN patients pa ON p.patient_id = pa.id
        INNER JOIN cities c ON pa.city_id = c.id
        INNER JOIN employees e ON e.id = p.doctor_id
        INNER JOIN rooms r ON e.room_id = r.id
        INNER JOIN departments d ON r.department_id = d.id
        INNER JOIN clinics cl ON d.clinic_id = cl.id
        INNER JOIN users u ON e.id = u.employee_id
        WHERE u.id = ${id}
        ORDER BY p.updated_at DESC;`,
      (err, results, fields) => {
        if (err) res.status(400).json(err);
        res.json(results);
      }
    );
  } else {
    conn.query(
      `SELECT p.id, p.arrived_at, p.departure_at,
        pa.last_name AS lastName, pa.first_name AS firstName,
        pa.father_name AS fatherName, c.name AS city,
        pa.street, pa.flat, pa.house, pa.phone_number AS phoneNumber,
        r.id AS room, cl.name as clinicName
        FROM presences p
        INNER JOIN patients pa ON p.patient_id = pa.id
        INNER JOIN cities c ON pa.city_id = c.id
        INNER JOIN employees e ON e.id = p.doctor_id
        INNER JOIN rooms r ON e.room_id = r.id
        INNER JOIN departments d ON r.department_id = d.id
        INNER JOIN clinics cl ON d.clinic_id = cl.id
        INNER JOIN users u ON e.id = u.employee_id
        WHERE u.id = ${id}
        ORDER BY p.updated_at DESC;`,
      (err, results, fields) => {
        if (err) res.status(400).json(err);
        res.json(results);
      }
    );
  }
});

// @route POST /api/visits

module.exports = router;
