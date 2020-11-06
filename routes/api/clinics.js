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
      "FROM clinics cl JOIN cities c",
    (err, results, fields) => {
      if (err) res.status(400).json(err);
      console.log(results);
      res.json(results);
    }
  );
});

module.exports = router;
