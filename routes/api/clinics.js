const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/clinics
router.get("/", (req, res) => {
  conn.query(
    "SELECT cl.id AS clinic_id, cl.name AS clinic_name, " +
      "cl.street AS clinic_street, cl.house AS clinic_house, " +
      "cl.type AS clinic_type, cl.schedule AS clinic_schedule, " +
      "cl.image as clinic_image, c.name AS city_name, c.id AS city_id, " +
      "cl.phone_number AS clinic_phoneNumber " +
      "FROM clinics cl INNER JOIN cities c ON cl.city_id = c.id",
    (err, results, fields) => {
      if (err) return res.status(400).json(err);
      return res.json(results);
    }
  );
});

// @route GET /api/clinics/id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  conn.query(
    "SELECT cl.id AS clinic_id, cl.name AS clinic_name, " +
      "cl.street AS clinic_street, cl.house AS clinic_house, " +
      "cl.type AS clinic_type, cl.schedule AS clinic_schedule, " +
      "cl.image as clinic_image, c.name AS city_name, c.id AS city_id, " +
      "cl.phone_number AS clinic_phoneNumber " +
      "FROM clinics cl INNER JOIN cities c ON cl.city_id = c.id " +
      `WHERE cl.id = ${id}`,
    (err, results, fields) => {
      if (err) return res.status(400).json(err);
      return res.json(results);
    }
  );
});

// @route POST /api/clinics
router.post("/", (req, res) => {
  const data = req.body;

  if (!{ ...req.body }) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  conn.query(
    "INSERT INTO clinics(city_id, name, street, " +
      "house, phone_number, type, schedule, image) VALUES( " +
      `${data.city}, "${data.name}", "${data.street}", ` +
      `"${data.house}", "${data.phoneNumber}", "${data.type}", ` +
      `"${data.schedule}", "${data.image}"); `,
    (err, results, fields) => {
      if (err) return res.status(400).json(err);

      return res.json({ ...data, id: results.insertId });
    }
  );
});

module.exports = router;
