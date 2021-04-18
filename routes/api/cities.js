const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/cities
router.get("/", (req, res) => {
  const cityQuery =
    "SELECT c.id, c.name, co.name AS country_name, c.country_id, " +
    "c.created_at, c.updated_at FROM cities c INNER JOIN " +
    "countries co ON c.country_id = co.id;";
  conn.query(cityQuery, (err, results, fields) => {
    if (err) return res.status(400).json(err);
    return res.json(results);
  });
});

// @route POST /api/cities
router.post("/", (req, res) => {
  const data = req.body;
  if (!{ ...req.body }) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  const insertQuery = `INSERT INTO cities(name, country_id) VALUES("${data.name}", ${data.country_id});`;
  conn.query(insertQuery, (err, results, fields) => {
    if (err) return res.status(400).json(err);
    return res.json({ ...data, id: results.insertId });
  });
});

module.exports = router;
