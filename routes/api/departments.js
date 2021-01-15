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
      return res.json(results);
    }
  );
});

// @route POST /api/departments/clinic_id
router.post("/ofClinic/:id", (req, res) => {
  const { clinicId, name } = req.body;

  if (!{ ...req.body }) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  conn.query(
    "INSERT INTO departments(clinic_id, name) " +
      `VALUES (${clinicId}, "${name}"); `,
    (err, results, fields) => {
      if (err) return res.status(400).json(err);

      return res.json({ clinicId, name, id: results.insertId });
    }
  );
});

// @route DELETE /api/departments/:id
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  conn.query(
    `DELETE FROM departments WHERE id = ${id}`,
    (err, results, fields) => {
      if (err) return res.status(400).json(err);

      return res.json({ success: true });
    }
  );
});

// @route PUT /api/departments/:id
router.put("/:id", (req, res) => {
  const { name, clinicId, id } = req.body;

  if (!{ ...req.body }) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  conn.query(
    "UPDATE departments SET " +
      `name = "${name}", clinic_id = ${clinicId} ` +
      `WHERE id = ${id}; `,
    (err, results, fields) => {
      if (err) return res.status(400).json(err);

      return res.json([{ id, name, clinic_id: clinicId }]);
    }
  );
});

module.exports = router;
