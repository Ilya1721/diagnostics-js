const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/roomstat
router.get("/", (req, res) => {
  conn.query("SELECT id FROM employees", (err, results, fields) => {
    if (err) return res.status(400).json(err);
    let queries = "";
    for (const result of results) {
      queries +=
        "SELECT r.id, number, COUNT(number) AS count " +
        "FROM rooms r INNER JOIN employees e ON e.room_id = r.id " +
        `WHERE e.id = ${result.id}; `;
    }
    conn.query(queries, (err, results, fields) => {
      if (err) return res.status(400).json(err);
      let response = [];
      for (const result of results) {
        response.push(...result);
      }
      return res.json(response);
    });
  });
});

module.exports = router;
