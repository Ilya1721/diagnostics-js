const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/departments
router.get("/", (req, res) => {
  conn.query("SELECT * FROM departments", (err, results, fields) => {
    if (err) return res.status(400).json(err);
    res.json(results);
  });
});

// @route GET /api/departments/clinic_id
router.get("/ofClinic/:id", (req, res) => {
  const id = req.params.id;

  conn.query(
    `SELECT * FROM departments WHERE clinic_id = ${id}`,
    (err, results, fields) => {
      if (err) return res.status(400).json(err);
      res.json(results);
    }
  );
});

// @route GET /api/departments/id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  conn.query(
    `SELECT * FROM departments WHERE id = ${id}`,
    (err, results, fields) => {
      if (err) return res.status(400).json(err);
      res.json(results);
    }
  );
});

module.exports = router;
