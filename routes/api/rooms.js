const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/rooms
router.get("/", (req, res) => {
  conn.query("SELECT * FROM rooms", (err, results, fields) => {
    if (err) return res.status(400).json(err);
    return res.json(results);
  });
});

// @route GET /api/rooms/department_id
router.get("/ofDepartment/:id", (req, res) => {
  const id = req.params.id;

  conn.query(
    `SELECT * FROM rooms WHERE department_id = ${id}`,
    (err, results, fields) => {
      if (err) return res.status(400).json(err);
      return res.json(results);
    }
  );
});

// @route GET /api/rooms/id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  conn.query(`SELECT * FROM rooms WHERE id = ${id}`, (err, results, fields) => {
    if (err) return res.status(400).json(err);

    return res.json(results);
  });
});

// @route POST /api/rooms/department_id
router.post("/ofDepartment/:id", (req, res) => {
  const { departmentId, number } = req.body;

  if (!{ ...req.body }) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  conn.query(
    "INSERT INTO rooms(number, department_id) " +
      `VALUES ("${number}", ${departmentId}); `,
    (err, results, fields) => {
      if (err) return res.status(400).json(err);

      return res.json({
        number,
        department_id: departmentId,
        id: results.insertId,
      });
    }
  );
});

// @route DELETE /api/rooms/id
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  conn.query(`DELETE FROM rooms WHERE id = ${id}`, (err, results, fields) => {
    if (err) return res.status(400).json(err);

    return res.json({ success: true });
  });
});

// @route PUT /api/rooms/id
router.put("/:id", (req, res) => {
  const { number, departmentId, id } = req.body;

  if (!{ ...req.body }) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  conn.query(
    "UPDATE rooms SET " +
      `number = "${number}", department_id = ${departmentId} ` +
      `WHERE id = ${id}; `,
    (err, results, fields) => {
      if (err) return res.status(400).json(err);

      return res.json({ id, number, department_id: departmentId });
    }
  );
});

module.exports = router;
